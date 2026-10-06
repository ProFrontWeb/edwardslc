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
  imageAlt: string;
  description: string;
  serviceTypes: ServiceType[];
}

export const serviceBlogs: ServiceBlog[] = [
  {
    title: "Summer to Fall Lawn Care: Help Your Lawn Recover",
    href: "/blog/summer-to-fall-lawn-care",
    image: "/assets/Blog/Summer-to-fall-lawn.webp",
    imageAlt: "Green residential lawn with scattered leaves and trees turning gold in early fall",
    description:
      "Plan fall aeration, seeding, mowing, and leaf cleanup with practical tips and help from Edwards Landscape Group.",
    serviceTypes: ["aeration-seeding", "mowing", "fertilization-weed-control", "fall-winter-cleanup", "bed-maintenance"],
  },
  {
    title: "Spring to Summer Lawn Care: A Healthy Transition",
    href: "/blog/spring-to-summer-lawn-care",
    image: "/assets/bg_2.jpg",
    imageAlt: "Green lawn bordered by planting beds and mature shade trees",
    description:
      "Adjust mowing, watering, feeding, and weed control as spring growth gives way to summer heat.",
    serviceTypes: ["mowing", "fertilization-weed-control"],
  },
  {
    title: "From Winter to Spring: Smart Lawn Care for a Strong Start",
    href: "/blog/winter-to-spring-lawn-care",
    image: "/assets/Blog/Winter-to-spring-transition.jpg",
    imageAlt: "Aerial view of a residential lawn with crosshatched mowing stripes",
    description:
      "Use a practical spring transition plan with cleanup, fertilization, aeration, seeding, and mowing for stronger turf.",
    serviceTypes: [],
  }
];
