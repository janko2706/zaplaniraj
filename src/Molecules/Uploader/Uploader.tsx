import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "firebaseConfig";
import React, { useState } from "react";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const tooltipStyle = {
  backgroundColor: "#e93535e1",
  color: "#fff",
  borderRadius: "10px",
};

type Props = {
  imageUrls: string[] | undefined;
  maximumImages: number;
  addToPictures: (url: string) => void;
  removeFromPictures: (location: string) => void;
  id: string;
  deleteImageInDB: (location: string) => Promise<boolean>;
};

const Uploader = ({
  imageUrls,
  maximumImages,
  deleteImageInDB,
  addToPictures,
  removeFromPictures,
  id,
}: Props) => {
  const [imageFile, setImageFile] = useState<File>();
  const [progressUpload, setProgressUpload] = useState(0);
  const user = useUser();

  function isValidHttpUrl(url: string) {
    try {
      const check = new URL(url);
      return check.protocol === "http:" || check.protocol === "https:";
    } catch (_) {
      return false;
    }
  }

  const handleUploadFile = (files: FileList) => {
    if (files.length && files[0] && files[0].size < 7000000) {
      setImageFile(files[0]);
    } else {
      toast.error("Slika je prevelika!");
      return;
    }
    if (imageUrls && imageUrls.length === maximumImages) {
      toast.error(`Maksimalno ${maximumImages} slika!`);
      return;
    }
    if (files[0] && user.isSignedIn && imageUrls) {
      const name = files[0].name;
      let shouldAlert = 0;
      imageUrls.map((item) => {
        if (item.includes(name)) {
          shouldAlert = 1;
        }
      });
      if (shouldAlert === 1) {
        toast.error("Slika vec postoji u oglasu!");
        return;
      }
      const storageRef = ref(
        storage,
        `${user.user.id}/${name.substring(0, 3)}`
      );
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress);
        },
        (error) => {
          console.error(error.message);
        },
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addToPictures(url);
          });
        }
      );
    } else {
      console.error("File not found");
    }
  };

  const deleteImage = async (location: string) => {
    const storageRef = ref(storage, location);

    const shouldUpdateFirebase = await deleteImageInDB(location);
    if (shouldUpdateFirebase) {
      try {
        await deleteObject(storageRef);
        removeFromPictures(location);
        toast.success("Slika je izbrisana.");
      } catch (error) {
        toast.error("Doslo je do pogreske, pokusajte ponovo kasnije.");
      }
    } else {
      toast.error("Doslo je do pogreske, pokusajte ponovo kasnije.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-full">
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className=" relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-3 h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm font-semibold text-gray-500">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500 ">
                  PNG, JPG (MAX. {maximumImages} slika / 7MB)
                </p>
              </div>
              <input
                id={id}
                accept="image/png,image/jpeg"
                multiple
                type="file"
                className="absolute z-50 h-full w-full opacity-0"
                onChange={(files) => {
                  if (files && files.target && files.target.files) {
                    handleUploadFile(files.target.files);
                  }
                }}
                onDropCapture={(files) => {
                  files.preventDefault();
                  if (
                    files &&
                    files.currentTarget &&
                    files.currentTarget.files
                  ) {
                    handleUploadFile(files.currentTarget.files);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              />
            </label>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-col">
            {imageFile && (
              <>
                <div className="mt-3 text-center">
                  {progressUpload === 0 || progressUpload === 100 ? null : (
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: `${progressUpload}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="flex flex-col flex-wrap gap-5 lg:flex-row">
              {imageUrls &&
                imageUrls.length > 0 &&
                imageUrls.map((item, idx) => {
                  if (!isValidHttpUrl(item)) return;
                  return (
                    <div className="relative" key={idx}>
                      <Image
                        src={item}
                        alt={item}
                        className="h-auto w-auto max-w-[300px] object-cover"
                        width={300}
                        height={300}
                      />
                      <button
                        type="button"
                        data-tooltip-id={`${item}-${idx}`}
                        className="absolute right-0 top-0 m-2 flex h-fit w-fit gap-5  rounded-lg bg-red-400 px-3 text-white bg-blend-difference transition-all duration-300 hover:cursor-pointer hover:bg-white hover:text-red-800"
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={async () => deleteImage(item)}
                      >
                        <XCircleIcon className="h-6 w-5" />
                      </button>
                      <Tooltip
                        id={`${item}-${idx}`}
                        style={tooltipStyle}
                        offset={7}
                        content="Izbrisi sliku"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
