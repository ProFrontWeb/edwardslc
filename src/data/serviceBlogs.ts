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
    title: "Spring to Summer Lawn Care: A Healthy Transition",
    href: "/blog/spring-to-summer-lawn-care",
    image: "/assets/bg_2.jpg",
    description:
      "Adjust mowing, watering, feeding, and weed control as spring growth gives way to summer heat.",
    serviceTypes: ["mowing", "fertilization-weed-control"],
  },
  {
    title: "From Winter to Spring: Smart Lawn Care for a Strong Start",
    href: "/blog/winter-to-spring-lawn-care",
    image: "/assets/Blog/Winter-to-spring-transition.jpg",
    description:
      "Use a practical spring transition plan with cleanup, fertilization, aeration, seeding, and mowing for stronger turf.",
    serviceTypes: [],
  }
];
