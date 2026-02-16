export type ServiceType =
  | "aeration-seeding"
  | "fertilization-weed-control"
  | "tree-shrub-care"
  | "mowing"
  | "fall-winter-cleanup"
  | "bed-maintenance"
  | "landscaping"
  | "landscape-design"
  | "mulching"
  | "hardscaping";

export interface ServiceBlog {
  title: string;
  href: string;
  image: string;
  description: string;
  serviceTypes: ServiceType[];
}

export const serviceBlogs: ServiceBlog[] = [
  {
    title: "From Winter to Spring: Smart Lawn Care for a Strong Start",
    href: "/blog/winter-to-spring-lawn-care",
    image: "/public/assets/Blog/Winter-to-spring-transition.jpg",
    description:
      "Use a practical spring transition plan with cleanup, fertilization, aeration, seeding, and mowing for stronger turf.",
    serviceTypes: [],
  }
];
