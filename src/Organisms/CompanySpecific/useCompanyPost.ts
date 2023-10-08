import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export const useCompanyPost = () => {
  const user = useUser();
  const userBusiness = api.bussines.getById.useQuery({
    clerkId: user.user ? user.user.id : "",
  });
  const businessPost = api.businessPost.getPostByBusinessId.useQuery({
    businessId: userBusiness.data?.id ?? "",
  });
  const categories = api.businessCategoryType.getAll.useQuery();

  const { mutateAsync: createPost } =
    api.businessPost.createBuinessPost.useMutation();
  return { businessPost, createPost, userBusiness, categories };
};
