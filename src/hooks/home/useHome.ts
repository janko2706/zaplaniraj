import { api } from "~/utils/api";

export const useHome = () => {
  const getUserOnboarding = api.user.getUserOnboarding.useQuery();

  return { getUserOnboarding };
};
