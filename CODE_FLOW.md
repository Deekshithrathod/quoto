# Quoto App — Code Flow Diagram

```mermaid
flowchart TD
    subgraph USER["User Interaction"]
        U1([Visit /])
        U2([Click AuthorBtn])
        U3([Scroll Down])
        U4([Click Header/RandomBtn])
    end

    subgraph NEXT["Next.js App Router · apps/web/app/"]
        subgraph LAYOUT["layout.tsx · Root Layout"]
            L1[Apply fonts\nRaleway + Montserrat]
            L2[Render Header + Footer]
        end

        subgraph HOME["page.tsx · Home Route"]
            H1[fetchRandomQuote\nSERVER ACTION]
            H2[GET /v1/quote/random]
        end

        subgraph AUTHOR["[authorId]/page.tsx · Author Route"]
            A1[fetchAuthorQuotes\nSERVER ACTION]
            A2["GET /v1/quote/{author}\n?limit=20&offset=0"]
            A3[generateMetadata]
        end

        subgraph DATA["lib/data.ts · Data Layer"]
            D1[fetchRandomQuote\nunstable_noStore]
            D2[fetchAuthorQuotes\nunstable_noStore]
        end
    end

    subgraph UI["Shared UI Library · packages/ui/src/"]
        subgraph HEADER_C["Header.tsx · Client Component"]
            HC1[useRouter\nusePathname]
            HC2["router.push / router.refresh()"]
        end

        subgraph QUOTE_C["Quote.tsx · Client Component"]
            Q1[MotionDiv wrapper]
            Q2[Display quote text\n+ metadata]
        end

        subgraph AUTHOR_BTN["AuthorBtn.tsx · Client Component"]
            AB1[MotionDiv wrapper]
            AB2[Link → /authorId]
        end

        subgraph LOAD_MORE["LoadMore.tsx · Client Component"]
            LM1[useInView\nIntersection Observer]
            LM2[fetchAuthorQuotes\noffset += 20]
            LM3[Append new quotes\nto state]
            LM4[Show QuoteSkeleton\nwhile loading]
        end

        subgraph MOVE_TOP["MoveToTop.tsx · Client"]
            MT1[Show when\nno more quotes]
            MT2[Scroll to top]
        end

        subgraph MOTION["MotionDiv.tsx · Client"]
            MV1[framer-motion\nmotion.div]
        end

        subgraph ANIMATE["utils/animate.tsx"]
            AN1[container variants\nstaggerChildren]
            AN2[item variants\nslide-in + fade]
        end

        subgraph SKELETONS["skeletons/"]
            SK1[QuoteSkeleton]
            SK2[AuthorBtnSkeleton]
        end
    end

    subgraph API["External API · api-quoto.onrender.com"]
        API1[GET /v1/quote/random]
        API2["GET /v1/quote/{author}\n?limit&offset"]
    end

    %% Entry flow
    U1 --> LAYOUT
    LAYOUT --> HOME
    HOME --> H1
    H1 --> D1
    D1 --> API1
    API1 --> H2
    H2 --> QUOTE_C
    H2 --> AUTHOR_BTN

    %% Author navigation
    U2 --> AUTHOR_BTN
    AB2 --> AUTHOR
    AUTHOR --> A1
    A1 --> D2
    D2 --> API2
    API2 --> A2
    A2 --> QUOTE_C
    A2 --> LOAD_MORE

    %% Infinite scroll
    U3 --> LM1
    LM1 -- "in view" --> LM2
    LM2 --> D2
    LM4 --> SK1
    LM2 --> LM3
    LM3 --> QUOTE_C
    LM3 -- "exhausted" --> MOVE_TOP

    %% Header navigation
    U4 --> HEADER_C
    HC1 --> HC2
    HC2 -- "already on /" --> HC2
    HC2 -- "navigate" --> HOME

    %% Shared animation
    QUOTE_C --> MV1
    AUTHOR_BTN --> MV1
    MV1 --> AN1
    MV1 --> AN2

    %% Loading skeletons shown during fetch
    HOME -. "Suspense" .-> SK2
    AUTHOR -. "Suspense" .-> SK1
```

## Module Responsibilities

| Module | Type | Responsibility |
|--------|------|---------------|
| `app/layout.tsx` | Server | Root layout: fonts, Header, Footer, metadata, PWA |
| `app/page.tsx` | Server | Home route — fetches and displays a random quote |
| `app/[authorId]/page.tsx` | Server | Author route — fetches and displays paginated author quotes |
| `app/lib/data.ts` | Server Action | All API calls to external quote API (no caching) |
| `components/Header.tsx` | Client | Navigation bar; refresh triggers new random quote |
| `packages/ui/Quote.tsx` | Client | Animated quote card display |
| `packages/ui/AuthorBtn.tsx` | Client | Animated author link button |
| `packages/ui/LoadMore.tsx` | Client | Infinite scroll via Intersection Observer + pagination |
| `packages/ui/MoveToTop.tsx` | Client | Scroll-to-top when quotes list is exhausted |
| `packages/ui/MotionDiv.tsx` | Client | Framer Motion wrapper for entrance animations |
| `packages/ui/utils/animate.tsx` | Util | Shared animation variant configs |
| `packages/ui/skeletons/` | Server | Loading skeleton placeholders |

## Data Flow Summary

1. **Home page** — Server fetches one random quote → renders `Quote` + `AuthorBtn`
2. **Author page** — Server fetches first 20 quotes → renders list + `LoadMore`
3. **Infinite scroll** — `LoadMore` watches viewport; on entering view it fetches the next page (`offset += 20`) and appends quotes
4. **Header click** — `router.refresh()` re-runs the server component, fetching a new random quote
5. **All data fetches** use `unstable_noStore()` — responses are never cached
