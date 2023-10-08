import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { env } from "~/env.mjs";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_MAPS_API_KEY,
  projectId: "zaplaniraj",
  storageBucket: "gs://zaplaniraj.appspot.com",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const storage = getStorage();
