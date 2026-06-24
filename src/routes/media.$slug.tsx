import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { getMediaPost } from "@/data/media";

export const Route = createFileRoute("/media/$slug")({
  head: ({ params }) => {
    const post = getMediaPost(params.slug);
    const title = post ? `${post.title} — APdS Architects` : "Media Post — APdS Architects";
    const description = post?.excerpt ?? "Media post by APdS Architects.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(post ? [{ property: "og:image", content: post.heroImage }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const post = getMediaPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <div className="pt-32 text-center">
      <h1 className="text-3xl font-extralight">Post not found</h1>
      <Link to="/media" className="mt-6 inline-block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground">
        ← BACK TO MEDIA
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-extralight">Something went wrong</h1>
        <button
          className="mt-6 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          RETRY
        </button>
      </div>
    );
  },
  component: MediaPostPage,
});

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("revealed");
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

function MediaPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className="pt-20">
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-10 lg:px-12 lg:pt-16">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-accent">{post.eyebrow.toUpperCase()}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extralight leading-tight text-foreground md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-[0.2em] text-muted-foreground">
            <span>{post.source.toUpperCase()}</span>
            {post.date ? <span>{post.date.toUpperCase()}</span> : null}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary md:aspect-[16/8]">
            <img src={post.heroImage} alt={post.title} className="h-full w-full object-cover" width={1800} height={1100} />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="text-[10px] tracking-[0.22em] text-muted-foreground">ARTICLE</p>
            <div className="mt-4 h-px w-16 bg-accent" />
          </Reveal>
          <Reveal className="md:col-span-9">
            <div className="space-y-6 text-base font-light leading-relaxed text-foreground/90 md:text-lg">
              {post.content.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="grid gap-6 md:grid-cols-2">
          {post.gallery.slice(1, 5).map((image: string, index: number) => (
            <Reveal key={image}>
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img src={image} alt={`${post.title} detail ${index + 1}`} className="h-full w-full object-cover" loading="lazy" width={1200} height={1500} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <Link to="/media" className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
          <span className="h-px w-8 bg-current" />
          BACK TO MEDIA
        </Link>
      </section>
    </div>
  );
}
