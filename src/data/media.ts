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

const blogPost: MediaPost = {
  slug: "why-hire-experienced-architect",
  eyebrow: "Blog",
  title: "Why Hiring an Experienced Architecture Firm Matters",
  source: "APdS Architects",
  date: "June 2026",
  excerpt:
    "From navigating regulations to refining every detail, the value of an experienced architectural team shows up long before — and long after — the first wall goes up.",
  heroImage: jalanParas?.gallery[0] ?? jalanParas?.image ?? "",
  gallery: jalanParas?.gallery.slice(0, 4) ?? [],
  content: [
    "Building or renovating a home is one of the most significant investments a person makes — financially, emotionally, and in terms of how they live day to day. The architect you choose shapes that investment more than almost any other decision. A firm with years of built work behind it brings a depth of judgement that simply cannot be shortcut, and that judgement quietly determines whether a project feels considered, calm, and resolved.",
    "Experienced practices have already encountered the regulatory landscape from many angles. Setbacks, plot ratios, envelope controls, party-wall conditions, drainage reserves, conservation overlays — these are not abstract rules but live constraints that shape what your home can become. A seasoned team reads them early, designs with them rather than against them, and avoids the costly redesigns that come from late-stage surprises.",
    "Good architecture is also about coordination. A house brings together structural engineers, M&E consultants, quantity surveyors, interior designers, landscape designers, and a main contractor — sometimes a dozen voices, all with their own priorities. An experienced firm holds that coordination tightly, so the ceiling line meets the window head cleanly, the air-con bulkhead doesn't eat into a sightline, and the staircase lands exactly where the structure allows it to.",
    "Years of practice also sharpen the instinct for material and detail. Which stone weathers well in our climate, how a timber soffit will silver over five years, where a flush detail is worth the cost and where a simple shadow gap reads better — these decisions only become second nature after building, observing, and refining across many projects. The result is a home that still looks considered a decade later, not just on handover day.",
    "Finally, experience shows up in how a project is run. Realistic programmes, honest cost advice, clear contractor tendering, calm responses when site conditions shift — these are the quiet markers of a firm that has been through the full arc of design and construction many times. For homeowners, that translates into fewer surprises, better outcomes, and a process that feels collaborative rather than adversarial.",
    "At APdS Architects, every project draws on this accumulated experience. We believe a good home is the product of careful listening, rigorous design, and a team that has earned the right to make confident decisions on your behalf.",
  ],
};

export const mediaPosts: MediaPost[] = [
  ...(jalanParas
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
    : []),
  blogPost,
];

export function getMediaPost(slug: string) {
  return mediaPosts.find((post) => post.slug === slug);
}
