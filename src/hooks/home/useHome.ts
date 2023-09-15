import { api } from "~/utils/api";

export const useHome = () => {
  const getUserOnboarding = api.user.getUserOnboarding.useQuery();
  const doesUserExists = api.user.doesUserExist.useQuery();

  return { getUserOnboarding, doesUserExists };
};
