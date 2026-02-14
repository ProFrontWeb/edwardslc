export type ServiceType =
  | "aeration-seeding"
  | "fertilization-weed-control"
  | "tree-shrub-care"
  | "mowing"
  | "fall-winter-cleanup"
  | "bed-maintenance"
  | "landscaping"
  | "mulching"
  | "hardscaping";

export interface ServiceBlog {
  title: string;
  href: string;
  description: string;
  serviceTypes: ServiceType[];
}

export const serviceBlogs: ServiceBlog[] = [
  {
    title: "Is Lawn Aeration Worth It?",
    href: "/blog/is-lawn-aeration-worth-it",
    description: "Understand how aeration improves root depth, drainage, and long-term turf health.",
    serviceTypes: ["aeration-seeding"],
  },
  {
    title: "Best Time to Aerate and Seed in Virginia",
    href: "/blog/best-time-to-aerate-and-seed-in-virginia",
    description: "Time your aeration and seeding for stronger germination and better lawn recovery.",
    serviceTypes: ["aeration-seeding"],
  },
  {
    title: "Overseeding Tips for Thicker Grass",
    href: "/blog/overseeding-tips-for-thicker-grass",
    description: "Simple steps to improve seed-to-soil contact and grow a fuller, healthier lawn.",
    serviceTypes: ["aeration-seeding"],
  },
  {
    title: "How to Water After Overseeding",
    href: "/blog/how-to-water-after-overseeding",
    description: "Use the right watering schedule to protect new seed and avoid patchy results.",
    serviceTypes: ["aeration-seeding"],
  },
  {
    title: "Spring Fertilizer Guide for Virginia Lawns",
    href: "/blog/spring-fertilizer-guide-for-virginia-lawns",
    description: "Apply the right nutrients at the right time for stronger spring green-up.",
    serviceTypes: ["fertilization-weed-control"],
  },
  {
    title: "Pre-Emergent vs. Post-Emergent Weed Control",
    href: "/blog/pre-emergent-vs-post-emergent-weed-control",
    description: "Learn which weed treatment to use and when for better control all season.",
    serviceTypes: ["fertilization-weed-control"],
  },
  {
    title: "Why Weeds Keep Coming Back (And How to Stop Them)",
    href: "/blog/why-weeds-keep-coming-back",
    description: "Identify common causes of recurring weeds and how to prevent repeat outbreaks.",
    serviceTypes: ["fertilization-weed-control"],
  },
  {
    title: "How to Get a Thicker, Greener Lawn",
    href: "/blog/how-to-get-a-thicker-greener-lawn",
    description: "Combine feeding, mowing, and watering practices for a dense, vibrant lawn.",
    serviceTypes: ["fertilization-weed-control"],
  },
  {
    title: "Best Time to Trim Shrubs in Virginia",
    href: "/blog/best-time-to-trim-shrubs-in-virginia",
    description: "Prune at the right time to protect blooms, shape growth, and avoid stress.",
    serviceTypes: ["tree-shrub-care"],
  },
  {
    title: "How to Keep Hedges Neat and Healthy",
    href: "/blog/how-to-keep-hedges-neat",
    description: "Keep hedges dense and tidy with proper trimming frequency and technique.",
    serviceTypes: ["tree-shrub-care"],
  },
  {
    title: "Common Shrub Trimming Mistakes",
    href: "/blog/common-shrub-trimming-mistakes",
    description: "Avoid trimming errors that can thin plants, reduce flowering, or cause damage.",
    serviceTypes: ["tree-shrub-care"],
  },
  {
    title: "How to Improve Landscape Curb Appeal",
    href: "/blog/how-to-improve-landscape-curb-appeal",
    description: "Use strategic trimming and plant care to create a cleaner, more polished look.",
    serviceTypes: ["tree-shrub-care"],
  },
  {
    title: "How Often Should You Mow Your Lawn?",
    href: "/blog/how-often-should-you-mow-your-lawn",
    description: "Get a simple schedule that keeps your lawn healthy through every growth phase.",
    serviceTypes: ["mowing"],
  },
  {
    title: "Common Mowing Mistakes to Avoid",
    href: "/blog/common-mowing-mistakes-to-avoid",
    description: "Avoid habits that thin turf, stress roots, and lead to uneven growth.",
    serviceTypes: ["mowing"],
  },
  {
    title: "Weekly vs. Bi-Weekly Lawn Service: What’s Best?",
    href: "/blog/weekly-vs-biweekly-lawn-service",
    description: "Compare service cadence so your lawn always looks tidy and well-kept.",
    serviceTypes: ["mowing"],
  },
  {
    title: "When to Edge Your Lawn for the Cleanest Look",
    href: "/blog/when-to-edge-your-lawn",
    description: "Learn the best timing for crisp edges that make your yard look polished.",
    serviceTypes: ["mowing"],
  },
  {
    title: "Fall Yard Cleanup Checklist",
    href: "/blog/fall-yard-cleanup-checklist",
    description: "Tackle the essential cleanup tasks that prepare your yard for colder weather.",
    serviceTypes: ["fall-winter-cleanup"],
  },
  {
    title: "Should You Remove Leaves from Your Lawn?",
    href: "/blog/should-you-remove-leaves-from-your-lawn",
    description: "See why leaf buildup can affect turf health and when removal is worth it.",
    serviceTypes: ["fall-winter-cleanup"],
  },
  {
    title: "How to Prepare Your Yard for Winter",
    href: "/blog/how-to-prepare-your-yard-for-winter",
    description: "Set your property up for spring success with a smart winter prep plan.",
    serviceTypes: ["fall-winter-cleanup"],
  },
  {
    title: "When to Schedule Fall Cleanup in Virginia",
    href: "/blog/when-to-schedule-fall-cleanup-in-virginia",
    description: "Choose the ideal cleanup window based on leaf drop and local conditions.",
    serviceTypes: ["fall-winter-cleanup"],
  },
  {
    title: "How to Keep Flower Beds Weed-Free",
    href: "/blog/how-to-keep-flower-beds-weed-free",
    description: "Reduce weed pressure with consistent maintenance and proactive bed care.",
    serviceTypes: ["bed-maintenance"],
  },
  {
    title: "Spring Flower Bed Cleanup Checklist",
    href: "/blog/spring-flower-bed-cleanup-checklist",
    description: "Start the season right with practical cleanup steps for healthier beds.",
    serviceTypes: ["bed-maintenance"],
  },
  {
    title: "How to Edge Flower Beds for a Crisp Look",
    href: "/blog/how-to-edge-flower-beds",
    description: "Create clean bed lines that sharpen curb appeal and simplify upkeep.",
    serviceTypes: ["bed-maintenance"],
  },
  {
    title: "Why Mulch and Bed Maintenance Work Best Together",
    href: "/blog/mulch-and-bed-maintenance-benefits",
    description: "See how combining services improves moisture retention and weed control.",
    serviceTypes: ["bed-maintenance"],
  },
  {
    title: "Top Landscaping Upgrades for Curb Appeal",
    href: "/blog/top-landscaping-upgrades-for-curb-appeal",
    description: "Explore impactful upgrades that instantly improve the look of your property.",
    serviceTypes: ["landscaping"],
  },
  {
    title: "Best Low-Maintenance Plants for Virginia",
    href: "/blog/best-low-maintenance-plants-for-virginia",
    description: "Choose plants that thrive locally while requiring less routine care.",
    serviceTypes: ["landscaping"],
  },
  {
    title: "How to Plan a Landscape Refresh",
    href: "/blog/how-to-plan-a-landscape-refresh",
    description: "Build a practical plan to update beds, hardscape, and plant layout.",
    serviceTypes: ["landscaping"],
  },
  {
    title: "Front Yard Landscaping Ideas",
    href: "/blog/front-yard-landscaping-ideas",
    description: "Get design inspiration to improve entry appeal and overall property value.",
    serviceTypes: ["landscaping"],
  },
  {
    title: "How Often Should You Mulch Your Beds?",
    href: "/blog/how-often-should-you-mulch-your-beds",
    description: "Find the right mulching cadence to protect plants and maintain bed health.",
    serviceTypes: ["mulching"],
  },
  {
    title: "Mulch vs. Rock: Which Is Better?",
    href: "/blog/mulch-vs-rock-which-is-better",
    description: "Compare materials by cost, appearance, and long-term maintenance needs.",
    serviceTypes: ["mulching"],
  },
  {
    title: "Best Mulch Depth for Flower Beds",
    href: "/blog/best-mulch-depth-for-flower-beds",
    description: "Apply mulch at the correct depth to prevent rot while blocking weeds.",
    serviceTypes: ["mulching"],
  },
  {
    title: "How to Prevent Weeds in Landscape Beds",
    href: "/blog/how-to-prevent-weeds-in-landscape-beds",
    description: "Layer prevention tactics that keep beds cleaner between maintenance visits.",
    serviceTypes: ["mulching"],
  },
  {
    title: "Paver Patio vs. Concrete: Which Is Better?",
    href: "/blog/paver-patio-vs-concrete-which-is-better",
    description: "Compare durability, aesthetics, and upkeep when choosing your patio surface.",
    serviceTypes: ["hardscaping"],
  },
  {
    title: "How to Choose the Right Paver Style",
    href: "/blog/how-to-choose-the-right-paver-style",
    description: "Match paver colors and patterns to your home for a cohesive outdoor design.",
    serviceTypes: ["hardscaping"],
  },
  {
    title: "Retaining Wall Ideas for Sloped Yards",
    href: "/blog/retaining-wall-ideas-for-sloped-yards",
    description: "Use retaining walls to add structure, function, and visual interest on slopes.",
    serviceTypes: ["hardscaping"],
  },
  {
    title: "Outdoor Living Upgrades That Add Value",
    href: "/blog/outdoor-living-upgrades-that-add-value",
    description: "Prioritize hardscape features that boost daily use and resale appeal.",
    serviceTypes: ["hardscaping"],
  },
];
