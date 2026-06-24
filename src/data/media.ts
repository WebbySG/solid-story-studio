import { getProject } from "@/data/projects";

export type MediaPost = {
  slug: string;
  eyebrow: string;
  title: string;
  source: string;
  date?: string;
  excerpt: string;
  heroImage: string;
  gallery: string[];
  content: string[];
};

const jalanParas = getProject("jalan-paras");

export const mediaPosts: MediaPost[] = jalanParas
  ? [
      {
        slug: "jalan-paras",
        eyebrow: "Project Feature",
        title: "Jalan Paras",
        source: "APdS Architects",
        excerpt:
          "A pair of semi-detached houses shaped by a triangular site, generous open spaces, and a strong connection to greenery, daylight, and outdoor living.",
        heroImage: jalanParas.image,
        gallery: jalanParas.gallery,
        content: [
          "Situated at the end of a road on a highly triangular plot, Jalan Paras is conceived as a careful response to an unusual site condition. Rather than resisting the geometry, the design uses it to define a pair of semi-detached homes with distinct spatial identities.",
          "The triangular unit introduces a wide living frontage that visually expands the ground floor beyond its actual footprint, while the rectangular unit follows a more conventional planning arrangement. Together, the two homes form a balanced architectural response that feels bright, open, and resolved.",
          "Across the project, generous open spaces and roof terraces maximise opportunities for greenery, natural light, and outdoor living. The result is a residential environment that turns a challenging plot into a calm, contemporary home with a strong connection to nature.",
        ],
      },
    ]
  : [];

export function getMediaPost(slug: string) {
  return mediaPosts.find((post) => post.slug === slug);
}
