import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import heroHome from "@/assets/hero-home.jpg";
import aboutTeam from "@/assets/about-team.jpg";

export type Project = {
  slug: string;
  image: string;
  title: string;
  category: "Residential" | "Commercial";
  location: string;
  year: string;
  client: string;
  area: string;
  status: string;
  description: string[];
  gallery: string[];
  facts: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "the-loft-house",
    image: project1,
    title: "The Loft House",
    category: "Residential",
    location: "Singapore",
    year: "2024",
    client: "Private Residence",
    area: "4,200 sq ft",
    status: "Completed",
    description: [
      "Set within a quiet enclave, The Loft House reinterprets the traditional shophouse typology through a contemporary lens. Double-height volumes, sliding timber screens, and a central courtyard bring daylight deep into the plan while preserving privacy from the street.",
      "Material restraint anchors the experience — warm oak, brushed travertine, and blackened steel work together to create a calm, tactile backdrop for daily life. Every threshold is considered as a moment of pause between the public and the intimate.",
    ],
    gallery: [project1, project3, heroHome, project4],
    facts: [
      { label: "Typology", value: "Private House" },
      { label: "Scope", value: "Architecture, Interior" },
      { label: "Photography", value: "Studio APdS" },
    ],
  },
  {
    slug: "horizon-tower",
    image: project2,
    title: "Horizon Tower",
    category: "Commercial",
    location: "Kuala Lumpur",
    year: "2023",
    client: "Horizon Group",
    area: "180,000 sq ft",
    status: "Completed",
    description: [
      "Horizon Tower reimagines the corporate workplace as a vertical neighbourhood. A layered façade of fluted glass and bronze fins responds to the tropical climate, modulating light and reducing solar gain while giving the building a quiet, sculptural presence on the skyline.",
      "Inside, sky lobbies and planted terraces interrupt the stack at every fifth floor, offering tenants moments of decompression and a strong connection to the city beyond.",
    ],
    gallery: [project2, heroHome, project1, project3],
    facts: [
      { label: "Typology", value: "Office Tower" },
      { label: "Scope", value: "Architecture, Façade" },
      { label: "Photography", value: "Studio APdS" },
    ],
  },
  {
    slug: "sunset-villa",
    image: project3,
    title: "Sunset Villa",
    category: "Residential",
    location: "Bali",
    year: "2023",
    client: "Private Residence",
    area: "6,500 sq ft",
    status: "Completed",
    description: [
      "Perched along a ridge above the Indian Ocean, Sunset Villa frames the horizon through a sequence of open pavilions linked by reflective pools and stone walkways. The architecture dissolves the line between interior and landscape.",
      "Locally sourced volcanic stone, hand-finished teak, and woven rattan ceilings ground the project in its setting while detailing remains precise and contemporary.",
    ],
    gallery: [project3, project4, heroHome, aboutTeam],
    facts: [
      { label: "Typology", value: "Resort Villa" },
      { label: "Scope", value: "Architecture, Landscape, Interior" },
      { label: "Photography", value: "Studio APdS" },
    ],
  },
  {
    slug: "zen-courtyard",
    image: project4,
    title: "Zen Courtyard",
    category: "Residential",
    location: "Kyoto",
    year: "2022",
    client: "Private Residence",
    area: "2,800 sq ft",
    status: "Completed",
    description: [
      "Zen Courtyard is a quiet meditation on the Japanese machiya. A narrow plan opens inward to a moss-and-gravel garden, anchoring the home around stillness rather than spectacle.",
      "Cedar joinery, rice paper screens, and a charred-timber rainscreen continue a dialogue between craft and contemporary detailing.",
    ],
    gallery: [project4, project3, aboutTeam, heroHome],
    facts: [
      { label: "Typology", value: "Courtyard House" },
      { label: "Scope", value: "Architecture, Interior" },
      { label: "Photography", value: "Studio APdS" },
    ],
  },
  {
    slug: "garden-residence",
    image: heroHome,
    title: "Garden Residence",
    category: "Residential",
    location: "Bangkok",
    year: "2022",
    client: "Private Residence",
    area: "5,100 sq ft",
    status: "Completed",
    description: [
      "Garden Residence threads a series of pavilions through a mature tropical garden, allowing the existing trees to dictate the geometry of the plan. Deep eaves and operable louvres support cross-ventilation throughout the year.",
      "The material palette of pale concrete, oak, and brass is intentionally muted, letting the surrounding greenery saturate the interior with colour and movement.",
    ],
    gallery: [heroHome, project1, project3, project4],
    facts: [
      { label: "Typology", value: "Family Home" },
      { label: "Scope", value: "Architecture, Landscape" },
      { label: "Photography", value: "Studio APdS" },
    ],
  },
  {
    slug: "urban-office",
    image: project1,
    title: "Urban Office",
    category: "Commercial",
    location: "Mumbai",
    year: "2021",
    client: "Confidential",
    area: "42,000 sq ft",
    status: "Completed",
    description: [
      "A workplace insertion within a heritage mill building, Urban Office balances the raw character of the existing structure with finely detailed contemporary interventions in steel and glass.",
      "Open floor plates are punctuated by quiet rooms, libraries, and a generous central stair that encourages incidental encounters across teams.",
    ],
    gallery: [project1, project2, heroHome, aboutTeam],
    facts: [
      { label: "Typology", value: "Workplace" },
      { label: "Scope", value: "Adaptive Reuse, Interior" },
      { label: "Photography", value: "Studio APdS" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
