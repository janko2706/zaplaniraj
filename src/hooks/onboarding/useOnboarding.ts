import { api } from "~/utils/api";

export const useOnboarding = () => {
  const { mutateAsync: createUser } = api.user.createUser.useMutation();
  const { mutateAsync: setOnboarding } = api.user.setOnboarding.useMutation();
  const doesUserExists = api.user.doesUserExist.useQuery();

  return { createUser, setOnboarding, doesUserExists };
};
