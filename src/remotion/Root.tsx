import { Composition, registerRoot } from "remotion";
import { VideoComposition } from "./VideoComposition";

function RemotionRoot() {
  return (
    <Composition
      id="SelfIntro"
      component={VideoComposition}
      durationInFrames={900}
      fps={30}
      width={800}
      height={450}
    />
  );
}

registerRoot(RemotionRoot);
