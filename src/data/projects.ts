import jalanParas7893 from "@/assets/jalan-paras-7893.png.asset.json";
import jalanParas7898 from "@/assets/jalan-paras-7898.png.asset.json";
import jalanParas7904 from "@/assets/jalan-paras-7904.png.asset.json";
import jalanParas7912 from "@/assets/jalan-paras-7912.png.asset.json";
import jalanParas7914 from "@/assets/jalan-paras-7914.png.asset.json";
import jalanParas7926 from "@/assets/jalan-paras-7926.png.asset.json";
import jalanParas7929 from "@/assets/jalan-paras-7929.png.asset.json";
import jalanParas7933 from "@/assets/jalan-paras-7933.png.asset.json";
import jalanParas7943 from "@/assets/jalan-paras-7943.png.asset.json";
import jalanParas7948 from "@/assets/jalan-paras-7948.png.asset.json";
import jalanParas7951 from "@/assets/jalan-paras-7951.png.asset.json";
import jalanParas7958 from "@/assets/jalan-paras-7958.png.asset.json";
import jalanParas7966 from "@/assets/jalan-paras-7966.png.asset.json";
import jalanParas7976 from "@/assets/jalan-paras-7976.png.asset.json";
import jalanParas7981 from "@/assets/jalan-paras-7981.png.asset.json";
import jalanParas7986 from "@/assets/jalan-paras-7986.png.asset.json";
import jalanParas7987 from "@/assets/jalan-paras-7987.png.asset.json";
import ourBar0 from "@/assets/our-bar-0-icon.png.asset.json";
import ourBar2 from "@/assets/our-bar-2-2.png.asset.json";
import ourBar3 from "@/assets/our-bar-3-2.png.asset.json";
import ourBar4 from "@/assets/our-bar-4.png.asset.json";
import ourBar5 from "@/assets/our-bar-5.png.asset.json";
import park100 from "@/assets/park-10-0-icon_1.png.asset.json";
import park102 from "@/assets/park-10-2_1.png.asset.json";
import park103 from "@/assets/park-10-3_1.png.asset.json";
import park104 from "@/assets/park-10-4_1.png.asset.json";
import park105 from "@/assets/park-10-5_1.png.asset.json";
import legendIcon from "@/assets/legend-icon.png.asset.json";
import legend2 from "@/assets/legend-2.png.asset.json";
import legend3 from "@/assets/legend-3.png.asset.json";
import legend4 from "@/assets/legend-4.png.asset.json";
import legend5 from "@/assets/legend-5.png.asset.json";
import legend6 from "@/assets/legend-6.png.asset.json";
import legend7 from "@/assets/legend-7.png.asset.json";
import legendDsc7995 from "@/assets/DSC_7995.png.asset.json";
import legendDsc7997 from "@/assets/DSC_7997.png.asset.json";
import legendDsc8006 from "@/assets/DSC_8006.png.asset.json";
import legendDsc8011 from "@/assets/DSC_8011.png.asset.json";
import legendDsc8014 from "@/assets/DSC_8014.png.asset.json";
import legendDsc8021 from "@/assets/DSC_8021.png.asset.json";

export type ProjectDiscipline = "Architectural" | "Interior Design";
export type ProjectCategory = "Residential" | "Commercial" | "Institutional";

export type Project = {
  slug: string;
  image: string;
  title: string;
  discipline: ProjectDiscipline;
  category: ProjectCategory;
  location?: string;
  year?: string;
  client?: string;
  area?: string;
  status?: string;
  description: string[];
  gallery: string[];
  facts: { label: string; value: string }[];
};

export const projectDisciplines: ProjectDiscipline[] = ["Architectural", "Interior Design"];
export const architecturalCategories: ProjectCategory[] = ["Residential", "Institutional", "Commercial"];

export const projects: Project[] = [
  {
    slug: "jalan-paras",
    image: jalanParas7943.url,
    title: "Jalan Paras",
    discipline: "Architectural",
    category: "Residential",
    location: "Singapore",
    client: "Private Residence",
    description: [
      "Situated at the end of a road on a highly triangular plot, this pair of semi-detached houses is carefully designed to respond to the site’s unusual geometry.",
      "The triangular unit features a wide living frontage that visually expands the ground floor beyond its actual footprint, while the rectangular unit adopts a more conventional planning approach.",
      "Generous open spaces and roof terraces are integrated throughout the development, maximising opportunities for greenery, natural light, and outdoor living. The result is a pair of bright and open homes that transform a challenging site condition into a distinctive architectural response with a strong connection to nature.",
    ],
    gallery: [
      jalanParas7943.url,
      jalanParas7893.url,
      jalanParas7898.url,
      jalanParas7904.url,
      jalanParas7912.url,
      jalanParas7914.url,
      jalanParas7926.url,
      jalanParas7929.url,
      jalanParas7933.url,
      jalanParas7948.url,
      jalanParas7951.url,
      jalanParas7958.url,
      jalanParas7966.url,
      jalanParas7976.url,
      jalanParas7981.url,
      jalanParas7986.url,
      jalanParas7987.url,
    ],
    facts: [
      { label: "Typology", value: "Pair of Semi-Detached Houses" },
      { label: "Discipline", value: "Architectural" },
      { label: "Site Response", value: "Highly triangular plot" },
      { label: "Design Focus", value: "Light, greenery, and outdoor living" },
    ],
  },
  {
    slug: "our-bar",
    image: ourBar0.url,
    title: "Our Bar",
    discipline: "Interior Design",
    category: "Commercial",
    location: "Singapore",
    client: "Our Bar",
    description: [
      "A small bar interior defined by a clean, understated design. A softly lit motif backdrop frames the wine shelving, while indirect lighting highlights the bar counter and ceiling.",
      "The result is a warm, intimate atmosphere that keeps focus on the wine display and overall ambience.",
    ],
    gallery: [ourBar0.url, ourBar2.url, ourBar4.url, ourBar5.url, ourBar3.url],
    facts: [
      { label: "Location", value: "Singapore" },
      { label: "Client", value: "Our Bar" },
      { label: "Discipline", value: "Interior Design" },
      { label: "Category", value: "Commercial" },
    ],
  },
  {
    slug: "park-10",
    image: park100.url,
    title: "Park 10",
    discipline: "Interior Design",
    category: "Commercial",
    location: "Singapore",
    client: "Park 10",
    description: [
      "This Japanese izakaya restaurant is designed around a contrast between energetic communal spaces and calm private dining rooms. Red and dark timber define the bar and public areas, while tatami and light wood finishes create a more intimate, homely atmosphere in the private rooms.",
      "At the centre, a custom BBQ pit invites guests to grill their own yakitori, adding an interactive dining experience. The entrance is expressed as a glass box, while architectural screens filter natural light into the space. Layered textures and soft indirect lighting complete the warm, inviting interior.",
    ],
    gallery: [park100.url, park102.url, park103.url, park104.url, park105.url],
    facts: [
      { label: "Location", value: "Singapore" },
      { label: "Client", value: "Park 10" },
      { label: "Discipline", value: "Interior Design" },
      { label: "Category", value: "Commercial" },
    ],
  },

  {
    slug: "legend-restaurant",
    image: legendIcon.url,
    title: "Legend Restaurant",
    discipline: "Interior Design",
    category: "Commercial",
    location: "Singapore",
    client: "Legend",
    description: [
      "Legend Restaurant at CIMB Plaza is a nostalgic dining concept designed in collaboration with ex-Singapore MasterChef finalist Aaron Wong. Inspired by Singapore's 1980s street food culture, the interior recreates the warmth and charm of old coffee shops, hawker stalls, and night markets.",
      "Orange paper lanterns, timber finishes, clay roof tiles, exposed bulbs, vintage signage, and a pushcart-style counter come together to create an immersive old-school atmosphere. The simple tables and stools reflect the casual, communal spirit of local dining, while the warm lighting and rustic details bring a sense of familiarity and memory.",
      "The result is a lively and character-filled restaurant that celebrates Singapore's food heritage, where design and cuisine work together to offer diners a nostalgic yet memorable experience.",
    ],
    gallery: [legendIcon.url, legend2.url, legend3.url, legend4.url, legend5.url, legend6.url, legend7.url],
    facts: [
      { label: "Location", value: "Singapore" },
      { label: "Client", value: "Legend" },
      { label: "Discipline", value: "Interior Design" },
      { label: "Category", value: "Commercial" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
