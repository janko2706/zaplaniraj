import type {
  Statistic,
  CompanyPost,
  Review,
  Business,
  User,
  BusinessTypeCategory,
  PostPrice,
} from "@prisma/client";

interface BuinessWithUser extends Business {
  user?: User | null;
}

export interface WholePostType extends CompanyPost {
  statistics: Statistic;
  reviews: Review[];
  business?: BuinessWithUser | null;
  selectedCategoriesIds?: {
    id: number;
    value: string;
    label: string;
  }[];
  prices: PostPrice[];
}
export interface PostForUserPlan extends CompanyPost {
  business?: BussinesForPLan | null;
}

export interface CompanyPostWihtoutDate extends CompanyPost {
  statistics?: Statistic;
  reviews?: Review[];
  selectedCategoriesIds: {
    id: number;
    value: string;
    label: string;
  }[];
  prices: PostPrice[];
}

interface BussinesForPLan extends Business {
  user?: User | null;
  typeOfBusiness: BusinessTypeCategory;
}
