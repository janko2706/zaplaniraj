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

type Props = {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
};

const Uploader = ({ imageUrls, setImageUrls }: Props) => {
  const [imageFile, setImageFile] = useState<File>();
  const [progressUpload, setProgressUpload] = useState(0);
  const user = useUser();

  const handleUploadFile = (files: FileList) => {
    if (files.length && files[0] && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      toast.error("File size to large");
    }
    if (files[0] && user.isSignedIn) {
      const name = files[0].name;
      let shouldAlert = 0;
      imageUrls.map((item) => {
        if (item.includes(name)) {
          shouldAlert = 1;
        }
      });
      if (shouldAlert === 1) {
        return;
      }
      const storageRef = ref(storage, `${user.user.id}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload
          // Snapshot states
          //  switch (snapshot.state) {
          //    case "paused":
          //      console.log("Upload is paused");
          //      break;
          //    case "running":
          //      console.log("Upload is running");
          //      break;
          //  }
        },
        (error) => {
          console.error(error.message);
        },
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setImageUrls((prev) => [...prev, url]);
          });
        }
      );
    } else {
      console.error("File not found");
    }
  };

  const deleteImage = async (location: string) => {
    const storageRef = ref(storage, location);

    await deleteObject(storageRef);
    setImageUrls((prev) => prev.filter((value) => value !== location));
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm font-semibold text-gray-500">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500 ">PNG, JPG (MAX. 10)</p>
              </div>
              <input
                id="dropzone-file"
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
            <div className="flex gap-5">
              {imageUrls.length > 0 &&
                imageUrls.map((item, idx) => {
                  return (
                    <div className="relative" key={idx}>
                      <Image
                        src={item}
                        alt={item}
                        className="h-full max-h-[200px] w-full object-cover"
                        width={100}
                        height={100}
                      />
                      <XCircleIcon
                        className="absolute right-0 top-0 h-6 w-6 text-red-400 bg-blend-difference hover:cursor-pointer hover:text-red-800"
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={async () => deleteImage(item)}
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
