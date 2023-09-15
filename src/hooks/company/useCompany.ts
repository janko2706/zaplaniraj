import { api } from "~/utils/api";

type Props = {
  clerkId: string;
};

export default function useCompany({ clerkId }: Props) {
  const companyResult = api.bussines.getById.useQuery({
    clerkId,
  });

  const userCompany = companyResult.data;

  return { companyResult, userCompany };
}
