import { useUser } from "@clerk/nextjs";
import avatarPlaceholder from "../Assets/avatar-placeholder.png";
import AppLogo from "../Assets/Company/LogoBig.png";

export default function useMainTemplate() {
  const userInfo = useUser();

  const user = {
    name: userInfo.user?.fullName,
    imageUrl:
      userInfo.isSignedIn && userInfo.isLoaded
        ? userInfo.user?.imageUrl
        : avatarPlaceholder,
    isSingnedIn: userInfo.isSignedIn,
  };
  return { user, AppLogo };
}
