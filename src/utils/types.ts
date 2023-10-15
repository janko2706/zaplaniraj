import type { Statistic, CompanyPost, Review } from "@prisma/client";

export interface WholePostType extends CompanyPost {
  statistics: Statistic;
  reviews: Review[];
}
