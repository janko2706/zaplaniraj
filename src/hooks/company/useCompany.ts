import { api } from "~/utils/api";
import type { WholePostType } from "~/utils/types";

type Props = {
  clerkId: string;
};

export default function useCompany({ clerkId }: Props) {
  const companyResult = api.bussines.getById.useQuery({
    clerkId,
  });

  const userCompany = companyResult.data;

  const postResult = api.businessPost.getPostById.useQuery({
    postId: userCompany?.companyPostId ?? 0,
  });
  const companyPost: WholePostType | undefined = postResult.data;
  return { companyResult, userCompany, companyPost };
}
