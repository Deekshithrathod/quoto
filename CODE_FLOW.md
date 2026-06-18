# Quoto App — Code Flow Diagram

```mermaid
flowchart TD
    subgraph USER["User Interaction"]
        U1([Visit /])
        U2([Click AuthorBtn])
        U3([Scroll Down])
        U4([Click RandomBtn])
        U5([Toggle theme])
    end

    subgraph NEXT["Next.js App Router · apps/web/app/"]
        subgraph LAYOUT["layout.tsx · Root Layout"]
            L1[Metadata + PWA + viewport]
            L2[Render Header + main + Footer]
        end

        subgraph HOME["page.tsx · Home Route · Server"]
            H1[fetchRandomQuote]
        end

        subgraph AUTHOR["[authorId]/page.tsx · Author Route · Server"]
            A1[fetchAuthorQuotes author, 0]
            A3[generateMetadata → title]
        end

        subgraph ROUTE["api/quotes/[author]/route.ts · Route Handler"]
            R1[GET ?offset=N]
            R2[fetchAuthorQuotes author, offset]
            R3[Cache-Control s-maxage=300, swr=86400]
        end

        subgraph DATA["lib/data.ts · Server-side Data Layer"]
            D1[fetchRandomQuote\ncache: no-store · 120ms timeout]
            D2[fetchAuthorQuotes\nrevalidate: 300 · 650ms timeout]
            D3[FALLBACK_QUOTES\nlocal resilience on error]
        end

        subgraph LOADING["loading.tsx · Suspense fallbacks"]
            LD1[Home: QuoteSkeleton + AuthorBtnSkeleton]
            LD2[Author: 5× QuoteSkeleton]
        end
    end

    subgraph WEBCOMP["App Components · apps/web/components/"]
        subgraph HEADER_C["Header.tsx · Client"]
            HC1[useTransition + useRouter + usePathname]
            HC2[not on / → router.push / else router.refresh]
        end
        subgraph THEME_C["ThemeToggle.tsx · Client"]
            TC1[localStorage quoto-theme]
            TC2[toggle .dark on html]
        end
    end

    subgraph UI["Shared UI Library · packages/ui/src/"]
        QUOTE_C["Quote.tsx · details disclosure\nsummary = text, body = author/genre"]
        AUTHOR_BTN["AuthorBtn.tsx · anchor → /author"]
        RANDOM_BTN["RandomBtn.tsx · isLoading spinner"]
        subgraph LOAD_MORE["LoadMore.tsx · Client"]
            LM1[IntersectionObserver sentinel\nrootMargin 360px]
            LM2[fetch /api/quotes/author?offset]
            LM3[append quotes to state]
            LM4[show QuoteSkeleton while loading]
            LM5[exhausted → MoveToTop]
        end
        MOVE_TOP["MoveToTop.tsx · anchor → #top"]
        SKELETONS["skeletons/ · QuoteSkeleton, AuthorBtnSkeleton"]
        FOOTER["Footer.tsx · credit link"]
    end

    subgraph API["External API · api-quoto.onrender.com"]
        API1[GET /v1/quote/random]
        API2["GET /v1/quote/{author}?limit&offset"]
    end

    %% Entry flow
    U1 --> LAYOUT --> HOME --> H1 --> D1 --> API1
    D1 -. on error/timeout .-> D3
    H1 --> QUOTE_C
    H1 --> AUTHOR_BTN
    HOME -. Suspense .-> LD1

    %% Author navigation
    U2 --> AUTHOR_BTN --> AUTHOR --> A1 --> D2 --> API2
    D2 -. on error/timeout .-> D3
    A1 --> QUOTE_C
    A1 --> LOAD_MORE
    AUTHOR -. Suspense .-> LD2

    %% Infinite scroll
    U3 --> LM1 -- in view --> LM2 --> R1 --> R2 --> D2
    LM4 --> SKELETONS
    LM2 --> LM3 --> QUOTE_C
    LM3 -- no more --> LM5 --> MOVE_TOP

    %% Header + theme
    LAYOUT --> HEADER_C
    HEADER_C --> RANDOM_BTN
    HEADER_C --> THEME_C
    U4 --> HC1 --> HC2 --> HOME
    U5 --> TC1 --> TC2
```

## Module Responsibilities

| Module                                          | Type               | Responsibility                                                                                                |
| ----------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`                                | Server             | Root layout: metadata, PWA manifest, viewport; renders Header + main + Footer; defaults to `dark` on `<html>` |
| `app/page.tsx`                                  | Server             | Home route — fetches and displays a random quote + author link                                                |
| `app/[authorId]/page.tsx`                       | Server             | Author route — fetches first page of author quotes; sets title via `generateMetadata`                         |
| `app/api/quotes/[author]/route.ts`              | Route Handler      | Pagination endpoint used by `LoadMore`; wraps `fetchAuthorQuotes`, sets cache headers                         |
| `app/lib/data.ts`                               | Server-side module | API calls with `AbortController` timeouts and local `FALLBACK_QUOTES` on failure                              |
| `app/loading.tsx`, `app/[authorId]/loading.tsx` | Server             | Suspense skeleton fallbacks during route data fetches                                                         |
| `components/Header.tsx`                         | Client             | Nav bar; `useTransition`-driven random refresh (`router.push`/`router.refresh`)                               |
| `components/ThemeToggle.tsx`                    | Client             | Dark/light toggle persisted to `localStorage`; toggles `.dark` on `<html>`                                    |
| `packages/ui/Quote.tsx`                         | Server             | Quote card as a `<details>` disclosure (text → author/genre)                                                  |
| `packages/ui/AuthorBtn.tsx`                     | Server             | Author link (anchor) with CSS hover affordance                                                                |
| `packages/ui/RandomBtn.tsx`                     | Client             | Random button with loading spinner (`aria-busy`)                                                              |
| `packages/ui/LoadMore.tsx`                      | Client             | Infinite scroll via Intersection Observer; fetches the pagination route                                       |
| `packages/ui/MoveToTop.tsx`                     | Server             | "No more quotes" + scroll-to-top anchor when the list is exhausted                                            |
| `packages/ui/skeletons/`                        | Server             | Loading skeleton placeholders                                                                                 |
| `packages/ui/Footer.tsx`                        | Server             | Footer credit link                                                                                            |

## Data Flow Summary

1. **Home page** — Server calls `fetchRandomQuote()` → renders `Quote` + `AuthorBtn`.
2. **Author page** — Server calls `fetchAuthorQuotes(author, 0)` (first 20) → renders the list + `LoadMore`.
3. **Infinite scroll** — `LoadMore` (client) watches a sentinel via Intersection Observer; on entering view it fetches `GET /api/quotes/{author}?offset=N` (the route handler delegates to `fetchAuthorQuotes`), appends results, and advances the offset by 20. When a page comes back empty it renders `MoveToTop`.
4. **Random refresh** — `Header`'s `RandomBtn` runs inside a `useTransition`: off the home route it `router.push("/")`, otherwise `router.refresh()` re-runs the home server component for a new quote.
5. **Theme** — `ThemeToggle` reads/writes `localStorage["quoto-theme"]` and toggles the `dark` class on `<html>`.

## Caching & Resilience

- **Random quote** uses `cache: "no-store"` — always fresh, never cached.
- **Author quotes** use `next: { revalidate: 300 }`; the API route additionally sets `Cache-Control: public, s-maxage=300, stale-while-revalidate=86400`.
- **Timeouts** — requests are aborted via `AbortController` (random: 120 ms, author: 650 ms). On any error or timeout, `data.ts` returns local `FALLBACK_QUOTES` so the UI never hard-fails.

## Animations

Entrance and disclosure animations are **pure CSS** (Tailwind transitions plus the `quote-details-in` keyframe in `packages/ui/styles.css`) and respect `prefers-reduced-motion`. There is no `framer-motion` dependency.
