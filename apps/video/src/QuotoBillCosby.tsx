import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { fallbackBillCosbyQuotes, getQuote, QuoteItem } from "./billCosbyData";

export type QuotoBillCosbyProps = {
  quotes?: QuoteItem[];
};

type ThemeColors = {
  background: string;
  foreground: string;
  muted: string;
  subtle: string;
  hoverSurface: string;
};

const gold = "#F7DF94";
const darkTheme: ThemeColors = {
  background: "#181818",
  foreground: "#F2F2F2",
  muted: "#C9C9C9",
  subtle: "#828282",
  hoverSurface: "#F7DF94",
};
const lightTheme: ThemeColors = {
  background: "#FAFAFA",
  foreground: "#333333",
  muted: "#4F4F4F",
  subtle: "#828282",
  hoverSurface: "#333333",
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.in(Easing.cubic);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);

const progressFrom = (
  frame: number,
  from: number,
  duration: number,
  easing = easeOut,
) =>
  interpolate(frame, [from, from + duration], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const clickPulse = (frame: number, from: number) =>
  interpolate(frame, [from, from + 6, from + 14], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const themeAt = (progress: number): ThemeColors => ({
  background: interpolateColors(
    progress,
    [0, 1],
    [darkTheme.background, lightTheme.background],
  ),
  foreground: interpolateColors(
    progress,
    [0, 1],
    [darkTheme.foreground, lightTheme.foreground],
  ),
  muted: interpolateColors(
    progress,
    [0, 1],
    [darkTheme.muted, lightTheme.muted],
  ),
  subtle: darkTheme.subtle,
  hoverSurface: interpolateColors(
    progress,
    [0, 1],
    [darkTheme.hoverSurface, lightTheme.hoverSurface],
  ),
});

const PageShell = ({
  children,
  chromeOpacity = 1,
  randomActive = false,
  randomClickFrom = 0,
  randomHover = 0,
  randomPress = 0,
  theme,
  themeHover = 0,
  themeIconProgress = 0,
  themePress = 0,
}: {
  children: ReactNode;
  chromeOpacity?: number;
  randomActive?: boolean;
  randomClickFrom?: number;
  randomHover?: number;
  randomPress?: number;
  theme: ThemeColors;
  themeHover?: number;
  themeIconProgress?: number;
  themePress?: number;
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontWeight: 500,
        letterSpacing: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          margin: "0 auto",
          maxWidth: 768,
          position: "relative",
          width: "88vw",
        }}
      >
        <HeaderControls
          opacity={chromeOpacity}
          randomActive={randomActive}
          randomClickFrom={randomClickFrom}
          randomHover={randomHover}
          randomPress={randomPress}
          theme={theme}
          themeHover={themeHover}
          themeIconProgress={themeIconProgress}
          themePress={themePress}
        />
        <main
          style={{
            flex: 1,
            overflow: "hidden",
            paddingBottom: 80,
            position: "relative",
          }}
        >
          {children}
        </main>
        <Footer opacity={chromeOpacity} theme={theme} />
      </div>
    </AbsoluteFill>
  );
};

const HeaderControls = ({
  opacity,
  randomActive,
  randomClickFrom,
  randomHover,
  randomPress,
  theme,
  themeHover = 0,
  themeIconProgress = 0,
  themePress = 0,
}: {
  opacity: number;
  randomActive: boolean;
  randomClickFrom: number;
  randomHover: number;
  randomPress: number;
  theme: ThemeColors;
  themeHover?: number;
  themeIconProgress?: number;
  themePress?: number;
}) => {
  const frame = useCurrentFrame();
  const themeHoverForeground = interpolateColors(
    themeIconProgress,
    [0, 1],
    ["#FFFFFF", lightTheme.foreground],
  );
  const randomHoverForeground = interpolateColors(
    themeIconProgress,
    [0, 1],
    ["#FFFFFF", lightTheme.foreground],
  );
  const randomSpin = randomActive
    ? interpolate(frame, [randomClickFrom, randomClickFrom + 42], [0, 360], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <nav
      style={{
        alignItems: "center",
        display: "flex",
        gap: 12,
        justifyContent: "flex-end",
        opacity,
        paddingTop: 32,
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: interpolateColors(
            themeHover,
            [0, 1],
            ["rgba(0,0,0,0)", "rgba(247,223,148,0.22)"],
          ),
          borderRadius: 999,
          color: interpolateColors(
            themeHover,
            [0, 1],
            [theme.foreground, themeHoverForeground],
          ),
          display: "grid",
          height: 40,
          justifyItems: "center",
          position: "relative",
          transform: `scale(${interpolate(themePress, [0, 1], [1, 0.9])})`,
          width: 40,
        }}
      >
        <span
          style={{
            display: "grid",
            inset: 0,
            opacity: 1 - themeIconProgress,
            placeItems: "center",
            position: "absolute",
          }}
        >
          <SunIcon />
        </span>
        <span
          style={{
            display: "grid",
            inset: 0,
            opacity: themeIconProgress,
            placeItems: "center",
            position: "absolute",
          }}
        >
          <MoonIcon />
        </span>
      </div>
      <div
        style={{
          alignItems: "center",
          backgroundColor: interpolateColors(
            randomHover,
            [0, 1],
            ["rgba(0,0,0,0)", "rgba(247,223,148,0.22)"],
          ),
          borderRadius: 999,
          color: interpolateColors(
            randomHover,
            [0, 1],
            [theme.foreground, randomHoverForeground],
          ),
          display: "flex",
          fontSize: 16,
          gap: 8,
          height: 40,
          padding: "0 12px",
          transform: `scale(${interpolate(randomPress, [0, 1], [1, 0.94])})`,
        }}
      >
        random
        <span
          style={{ display: "block", transform: `rotate(${randomSpin}deg)` }}
        >
          <RefreshIcon />
        </span>
      </div>
    </nav>
  );
};

const AuthorTitle = ({
  author,
  enter,
  opacity,
  theme,
}: {
  author: string;
  enter: number;
  opacity: number;
  theme: ThemeColors;
}) => {
  return (
    <div
      style={{
        color: theme.foreground,
        fontSize: 40,
        fontWeight: 700,
        left: 64,
        lineHeight: 1,
        opacity,
        position: "absolute",
        top: 14,
        transform: `translate3d(${interpolate(enter, [0, 1], [-20, 0])}px, 0, 0)`,
        width: "calc(100% - 64px)",
        zIndex: 5,
      }}
    >
      {author}
    </div>
  );
};

const QuoteBlock = ({
  quote,
  theme,
}: {
  quote: QuoteItem;
  theme: ThemeColors;
}) => {
  return (
    <blockquote
      style={{
        borderLeft: `8px solid ${gold}`,
        margin: "0 auto",
        maxWidth: 768,
        paddingLeft: 64,
        width: "100%",
      }}
    >
      <p
        style={{
          color: theme.foreground,
          fontSize: 40,
          lineHeight: 1.18,
          margin: 0,
          overflowWrap: "break-word",
        }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>
    </blockquote>
  );
};

const AuthorButton = ({
  clickFrom,
  exit,
  hoverFrom,
  quote,
  theme,
}: {
  clickFrom: number;
  exit: number;
  hoverFrom: number;
  quote: QuoteItem;
  theme: ThemeColors;
}) => {
  const frame = useCurrentFrame();
  const hover = progressFrom(frame, hoverFrom, 14);
  const press = clickPulse(frame, clickFrom);
  const background = interpolateColors(
    hover,
    [0, 1],
    ["rgba(0,0,0,0)", theme.hoverSurface],
  );
  const foreground = interpolateColors(
    hover,
    [0, 1],
    [theme.muted, theme.background],
  );

  return (
    <div
      style={{
        height: interpolate(exit, [0, 1], [132, 0]),
        marginTop: interpolate(exit, [0, 1], [48, 0]),
        opacity: 1 - exit,
        overflow: "hidden",
        transform: `translateY(${interpolate(exit, [0, 1], [0, -10])}px) scale(${interpolate(
          press,
          [0, 1],
          [1, 0.99],
        )})`,
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: background,
          color: foreground,
          display: "flex",
          height: 132,
          justifyContent: "space-between",
          padding: 40,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ fontSize: 20, textTransform: "capitalize" }}>
            {quote.author}
          </span>
          <span
            style={{
              color: interpolateColors(
                hover,
                [0, 1],
                [theme.subtle, theme.background],
              ),
              fontSize: 14,
              textTransform: "lowercase",
            }}
          >
            {quote.genre}
          </span>
        </div>
        <span
          style={{
            opacity: hover,
            transform: `translateX(${interpolate(hover, [0, 1], [-4, 0])}px)`,
          }}
        >
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
};

const QuoteList = ({
  quotes,
  slideStart,
  theme,
}: {
  quotes: QuoteItem[];
  slideStart: number;
  theme: ThemeColors;
}) => {
  const frame = useCurrentFrame();

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 64,
        marginTop: 58,
      }}
    >
      {quotes.map((quote, index) => {
        const enter = progressFrom(frame, slideStart + index * 9, 22);

        return (
          <div
            key={`${quote.text}-${index}`}
            style={{
              opacity: enter,
              transform: `translate3d(${interpolate(enter, [0, 1], [-20, 0])}px, 0, 0)`,
            }}
          >
            <QuoteBlock quote={quote} theme={theme} />
          </div>
        );
      })}
    </section>
  );
};

const GetMoreQuotesButton = ({
  clickFrom,
  hoverFrom,
  theme,
}: {
  clickFrom: number;
  hoverFrom: number;
  theme: ThemeColors;
}) => {
  const frame = useCurrentFrame();
  const hover = progressFrom(frame, hoverFrom, 14);
  const press = clickPulse(frame, clickFrom);

  return (
    <div
      style={{
        marginTop: 82,
        paddingBottom: 160,
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: interpolateColors(
            hover,
            [0, 1],
            ["rgba(0,0,0,0)", theme.hoverSurface],
          ),
          border: `1px solid rgba(247, 223, 148, ${interpolate(
            hover,
            [0, 1],
            [0.28, 0],
          )})`,
          color: interpolateColors(
            hover,
            [0, 1],
            [theme.muted, theme.background],
          ),
          display: "flex",
          fontSize: 20,
          height: 96,
          justifyContent: "space-between",
          padding: "0 40px",
          textTransform: "lowercase",
          transform: `scale(${interpolate(press, [0, 1], [1, 0.985])})`,
          width: "100%",
        }}
      >
        <span>get more quotes</span>
        <span
          style={{
            opacity: hover,
            transform: `translateX(${interpolate(hover, [0, 1], [-4, 0])}px)`,
          }}
        >
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
};

const Cursor = ({
  clickFrom,
  from,
  moveFrames = 44,
  points,
  to,
}: {
  clickFrom: number;
  from: number;
  moveFrames?: number;
  points: { x: number; y: number }[];
  to?: number;
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [from, from + moveFrames],
    [0, points.length - 1],
    {
      easing: easeOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const left = interpolate(
    progress,
    points.map((_, index) => index),
    points.map((point) => point.x),
  );
  const top = interpolate(
    progress,
    points.map((_, index) => index),
    points.map((point) => point.y),
  );
  const click = clickPulse(frame, clickFrom);
  const fadeIn = progressFrom(frame, from, 10);
  const fadeOut =
    to === undefined ? 1 : 1 - progressFrom(frame, to - 10, 10, easeInOut);

  return (
    <div
      style={{
        filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.28))",
        left,
        opacity: Math.min(fadeIn, fadeOut),
        position: "absolute",
        top,
        transform: `scale(${interpolate(click, [0, 1], [1, 0.82])})`,
        zIndex: 10,
      }}
    >
      <svg fill="none" height="34" viewBox="0 0 30 34" width="30">
        <path
          d="M4 3L25 22L15.2 23.6L10.2 31.8L4 3Z"
          fill="#F2F2F2"
          stroke="#181818"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
};

const SceneOneQuoteExpansion = ({ quotes }: { quotes: QuoteItem[] }) => {
  const frame = useCurrentFrame();
  const firstQuote = getQuote(quotes, 0);
  const randomQuote = getQuote(quotes, 11);
  const additionalQuotes = Array.from({ length: 10 }, (_, index) =>
    getQuote(quotes, index + 1),
  );

  const intro = progressFrom(frame, 0, 34);
  const authorCursorFrom = 42;
  const authorClickFrom = authorCursorFrom + 44;
  const authorHoverFrom = authorClickFrom - 14;
  const buttonExitFrom = authorClickFrom + 10;
  const listSlideStart = buttonExitFrom + 18;
  const scrollStart = listSlideStart + 118;
  const scrollEnd = scrollStart + 138;
  const moreCursorFrom = scrollEnd + 12;
  const moreClickFrom = moreCursorFrom + 46;
  const moreHoverFrom = moreClickFrom - 14;
  const returnScrollStart = moreClickFrom + 32;
  const returnScrollEnd = returnScrollStart + 48;
  const themeCursorFrom = returnScrollEnd + 14;
  const themeClickFrom = themeCursorFrom + 34;
  const themeHoverFrom = themeClickFrom - 12;
  const randomCursorFrom = themeClickFrom + 66;
  const randomClickFrom = randomCursorFrom + 32;
  const randomHoverFrom = randomClickFrom - 12;
  const quoteEraseFrom = randomClickFrom + 8;
  const randomQuoteEnterFrom = quoteEraseFrom + 26;

  const buttonExit = progressFrom(frame, buttonExitFrom, 22, easeIn);
  const scrollDown = progressFrom(
    frame,
    scrollStart,
    scrollEnd - scrollStart,
    easeInOut,
  );
  const scrollBack = progressFrom(
    frame,
    returnScrollStart,
    returnScrollEnd - returnScrollStart,
    easeInOut,
  );
  const endFocus = progressFrom(frame, moreHoverFrom - 8, 32, easeOut);
  const authorTitleEnter = progressFrom(frame, authorClickFrom + 8, 22);
  const chromeOpacity = Math.max(
    1 - progressFrom(frame, scrollStart, 28, easeInOut),
    progressFrom(frame, returnScrollEnd - 18, 22, easeInOut),
  );
  const titleOpacity =
    authorTitleEnter *
    (1 - progressFrom(frame, scrollStart - 18, 18, easeInOut));
  const themeHover =
    progressFrom(frame, themeHoverFrom, 12) *
    (1 - progressFrom(frame, randomCursorFrom, 12, easeInOut));
  const themePress = clickPulse(frame, themeClickFrom);
  const themeProgress = progressFrom(frame, themeClickFrom + 8, 32, easeInOut);
  const theme = themeAt(themeProgress);
  const randomHover = progressFrom(frame, randomHoverFrom, 12);
  const randomPress = clickPulse(frame, randomClickFrom);
  const quoteErase = progressFrom(frame, quoteEraseFrom, 24, easeInOut);
  const randomQuoteEnter = progressFrom(frame, randomQuoteEnterFrom, 24);
  const scrollY = 1810 * Math.max(0, scrollDown - scrollBack);
  const cameraScale = interpolate(
    frame,
    [
      0,
      50,
      scrollStart,
      scrollEnd,
      moreClickFrom + 12,
      returnScrollEnd,
      themeClickFrom + 36,
    ],
    [1.025, 1, 1, 0.93, 0.97, 1, 1],
    {
      easing: easeInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const cameraFocus = endFocus * (1 - scrollBack);
  const cameraY = interpolate(cameraFocus, [0, 1], [0, -16]);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      <div
        style={{
          height: "100%",
          transform: `translateY(${cameraY}px) scale(${cameraScale})`,
          transformOrigin: "50% 62%",
          width: "100%",
        }}
      >
        <PageShell
          chromeOpacity={chromeOpacity}
          randomActive
          randomClickFrom={randomClickFrom}
          randomHover={randomHover}
          randomPress={randomPress}
          theme={theme}
          themeHover={themeHover}
          themeIconProgress={themeProgress}
          themePress={themePress}
        >
          <AuthorTitle
            author={firstQuote.author}
            enter={authorTitleEnter}
            opacity={titleOpacity}
            theme={theme}
          />
          <div
            style={{
              opacity: intro * (1 - quoteErase),
              transform: `translate3d(0, ${
                interpolate(intro, [0, 1], [16, 0]) -
                scrollY -
                interpolate(quoteErase, [0, 1], [0, 12])
              }px, 0)`,
              width: "100%",
            }}
          >
            <div style={{ marginTop: 96 }}>
              <QuoteBlock quote={firstQuote} theme={theme} />
              <AuthorButton
                clickFrom={authorClickFrom}
                exit={buttonExit}
                hoverFrom={authorHoverFrom}
                quote={firstQuote}
                theme={theme}
              />
              <QuoteList
                quotes={additionalQuotes}
                slideStart={listSlideStart}
                theme={theme}
              />
              <GetMoreQuotesButton
                clickFrom={moreClickFrom}
                hoverFrom={moreHoverFrom}
                theme={theme}
              />
            </div>
          </div>
          <div
            style={{
              left: 0,
              marginTop: 96,
              opacity: randomQuoteEnter,
              position: "absolute",
              top: 0,
              transform: `translate3d(${interpolate(
                randomQuoteEnter,
                [0, 1],
                [-20, 0],
              )}px, 0, 0)`,
              width: "100%",
            }}
          >
            <QuoteBlock quote={randomQuote} theme={theme} />
            <AuthorButton
              clickFrom={10000}
              exit={0}
              hoverFrom={10000}
              quote={randomQuote}
              theme={theme}
            />
          </div>
          <Cursor
            clickFrom={authorClickFrom}
            from={authorCursorFrom}
            points={[
              { x: 486, y: 274 },
              { x: 620, y: 322 },
              { x: 704, y: 362 },
            ]}
            to={buttonExitFrom + 18}
          />
          <Cursor
            clickFrom={moreClickFrom}
            from={moreCursorFrom}
            points={[
              { x: 642, y: 622 },
              { x: 574, y: 704 },
              { x: 704, y: 770 },
            ]}
            to={returnScrollStart}
          />
        </PageShell>
      </div>
      <Cursor
        clickFrom={themeClickFrom}
        from={themeCursorFrom}
        moveFrames={34}
        points={[
          { x: 1324, y: 820 },
          { x: 1242, y: 292 },
          { x: 1205, y: 49 },
        ]}
        to={randomCursorFrom + 8}
      />
      <Cursor
        clickFrom={randomClickFrom}
        from={randomCursorFrom}
        moveFrames={32}
        points={[
          { x: 1205, y: 49 },
          { x: 1246, y: 49 },
          { x: 1288, y: 49 },
        ]}
      />
    </AbsoluteFill>
  );
};

const Footer = ({
  opacity,
  theme,
}: {
  opacity: number;
  theme: ThemeColors;
}) => (
  <div
    style={{
      color: theme.subtle,
      fontSize: 14,
      opacity,
      paddingBottom: 18,
      textAlign: "center",
      width: "100%",
    }}
  >
    created by <strong>Deekshith Rathod</strong>
  </div>
);

const SunIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <path d="M12 3a6 6 0 0 0 9 7.4A9 9 0 1 1 12 3Z" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
  >
    <path d="M21 12a9 9 0 0 1-15.2 6.5" />
    <path d="M3 12A9 9 0 0 1 18.2 5.5" />
    <path d="M3 20v-6h6" />
    <path d="M21 4v6h-6" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const QuotoBillCosby = ({
  quotes = fallbackBillCosbyQuotes,
}: QuotoBillCosbyProps) => {
  return <SceneOneQuoteExpansion quotes={quotes} />;
};
