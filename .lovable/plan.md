# Review Comments — Implementation Plan

I went through all 19 comments. Most are code/UX changes I can do right now. A handful reference files in your local "APdS Architects" folder (Home carousel photos, Company Logo, updated team photos, upcoming-project images) — I'll need you to upload those before I can apply them.

## A. Ship now (no assets required)

1. **Projects ordered descending** in `src/data/projects.ts` (applies to Architectural + Interior).
2. **Project page metadata cleanup (#14)** — remove the lower "Typology / Site Response / Discipline / Design Focus" duplicate block on `work.$slug.tsx`.
3. **Jalan Paras layout (#15)** — shrink project title ~50%, change featured image to full-view (object-contain, no crop).
4. **WhatsApp icon centering (#6)** in `WhatsAppWidget.tsx`.
5. **Justify Desmond/Sin Yong bio text (#10)** on About page.
6. **"Company established 2005" (#11)** — update About hero "EST. 2009" → "EST. 2005" and any other references.
7. **Google Map embed on Contact page (#12)** — embed for 32A Mosque Street (placeholder address; confirm exact office address).
8. **Instagram icon in header nav (#13)** beside Contact link, link to your existing IG.
9. **Replace MEDIA with UPCOMING & reorder nav (#17)** — `HOME, ABOUT, WORK, UPCOMING, TEAM, CONTACT`. Rename route `media` → `upcoming`. Keeps blog data file dormant.
10. **Create UPCOMING page (#18)** — single page, vertical grid of upcoming-project images (empty state until you upload images).
11. **OPPORTUNITIES section on Contact page (#19)** — add block with the copy you provided.
12. **Mobile logo size fix (#16)** — reduce header logo height on small screens.
13. **"Completed projects 188+" (#3)** — update stats counter on About page.
14. **Photo credit "Dan Marbella" (#9)** — wire into project gallery so the last image on Residential projects 4–12 shows the credit caption. (Needs the project ordering to be finalised first — easy after #1.)

## B. Needs uploads from you

- **#4** Home page hero carousel — 4 photos from `APdS Architects > Pages > Home`.
- **#5** Company logo — the official file from `APdS Architects > Images > Company Logo` (to replace current header logo).
- **#7** Updated team photos + names, plus **Dan Marbella's** photo.
- **#2** "0-ICON" thumbnail per project — easiest if you upload one folder per project named with the project slug, or just send the 17 thumbnails labelled with project names.
- **#18** Upcoming-project images.

Please drop those into the chat and I'll wire them in.

## C. Confirm before I touch

- **Contact address** — comment #19 references RT+Q's address (32A Mosque Street). What's APdS's actual office address, phone, fax for the Contact page?
- **Instagram URL** — confirm the handle to link from the header icon.
- **MEDIA route** — OK to fully retire the blog (delete `media.tsx`, `media.$slug.tsx`, `data/media.ts`) or keep them as hidden routes?

I'll start on section A as soon as you confirm — or say "go" and I'll proceed with sensible defaults for section C.
