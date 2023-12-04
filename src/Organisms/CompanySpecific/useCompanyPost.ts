import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export const useCompanyPost = () => {
  const user = useUser();
  const getPostsByCategory = api.businessPost.getPostByCategory;
  const userBusiness = api.bussines.getById.useQuery({
    clerkId: user.user ? user.user.id : "",
  });
  const businessPost = api.businessPost.getPostByBusinessId.useQuery({
    businessId: userBusiness.data?.id ?? "",
  });
  const eventCategories =
    api.businessCategoryType.getAllEventCategories.useQuery();

  const { mutateAsync: createPost } =
    api.businessPost.createBuinessPost.useMutation();
  const { mutateAsync: createPostPrice, isLoading: isCreatingPrice } =
    api.businessPost.createPostPrice.useMutation();
  const { mutateAsync: deletePostImage } =
    api.businessPost.deleteImageFromPost.useMutation();
  const { mutateAsync: updatePost, isLoading: isUpdatePostLoading } =
    api.businessPost.updatePost.useMutation();
  return {
    businessPost,
    createPost,
    userBusiness,
    eventCategories,
    updatePost,
    deletePostImage,
    isUpdatePostLoading,
    getPostsByCategory,
    createPostPrice,
    isCreatingPrice,
  };
};
