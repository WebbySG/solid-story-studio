import jalanParas1 from "@/assets/jalan-paras-1.png.asset.json";
import jalanParas2 from "@/assets/jalan-paras-2.png.asset.json";
import jalanParas3 from "@/assets/jalan-paras-3.png.asset.json";
import jalanParas4 from "@/assets/jalan-paras-4.png.asset.json";
import jalanParas5 from "@/assets/jalan-paras-5.png.asset.json";
import jalanParas6 from "@/assets/jalan-paras-6.png.asset.json";
import jalanParas7 from "@/assets/jalan-paras-7.png.asset.json";
import jalanParas8 from "@/assets/jalan-paras-8.png.asset.json";
import jalanParas7943 from "@/assets/jalan-paras-7943.png.asset.json";
import jalanParas7948 from "@/assets/jalan-paras-7948.png.asset.json";
import jalanParas7951 from "@/assets/jalan-paras-7951.png.asset.json";
import jalanParas7958 from "@/assets/jalan-paras-7958.png.asset.json";
import jalanParas7966 from "@/assets/jalan-paras-7966.png.asset.json";
import jalanParas7976 from "@/assets/jalan-paras-7976.png.asset.json";
import jalanParas7981 from "@/assets/jalan-paras-7981.png.asset.json";
import jalanParas7986 from "@/assets/jalan-paras-7986.png.asset.json";
import jalanParas7987 from "@/assets/jalan-paras-7987.png.asset.json";

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
      jalanParas7948.url,
      jalanParas7951.url,
      jalanParas7958.url,
      jalanParas7966.url,
      jalanParas7976.url,
      jalanParas7981.url,
      jalanParas7986.url,
      jalanParas7987.url,
      jalanParas1.url,
      jalanParas2.url,
      jalanParas3.url,
      jalanParas4.url,
      jalanParas5.url,
      jalanParas6.url,
      jalanParas7.url,
      jalanParas8.url,
    ],
    facts: [
      { label: "Typology", value: "Pair of Semi-Detached Houses" },
      { label: "Discipline", value: "Architectural" },
      { label: "Site Response", value: "Highly triangular plot" },
      { label: "Design Focus", value: "Light, greenery, and outdoor living" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
