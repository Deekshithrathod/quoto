import { Composition } from "remotion";
import generatedBillCosbyQuotes from "./generatedBillCosbyQuotes.json";
import { normalizeBillCosbyQuotes } from "./billCosbyData";
import { QuotoBillCosby, QuotoBillCosbyProps } from "./QuotoBillCosby";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 780;

const defaultProps = {
  quotes: normalizeBillCosbyQuotes(generatedBillCosbyQuotes),
} satisfies QuotoBillCosbyProps;

export const RemotionRoot = () => {
  return (
    <Composition
      id="QuotoBillCosby"
      component={QuotoBillCosby}
      defaultProps={defaultProps}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
