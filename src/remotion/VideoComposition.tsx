import { useCurrentFrame, useVideoConfig, AbsoluteFill, Audio, staticFile } from "remotion";
import Scene1_Intro from "../components/Scene1_Intro";
import Scene2_Hobbies from "../components/Scene2_Hobbies";
import Scene3_Learning1 from "../components/Scene3_Learning1";
import Scene4_Learning2 from "../components/Scene4_Learning2";
import Scene5_Outro from "../components/Scene5_Outro";

const SCENES = [
  { Component: Scene1_Intro,    durationFrames: 180 }, // 6s
  { Component: Scene2_Hobbies,  durationFrames: 180 }, // 6s
  { Component: Scene3_Learning1,durationFrames: 210 }, // 7s
  { Component: Scene4_Learning2,durationFrames: 210 }, // 7s
  { Component: Scene5_Outro,    durationFrames: 120 }, // 4s
];

export function VideoComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let remaining = frame;
  let sceneIndex = SCENES.length - 1;
  let sceneFrame = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (remaining < SCENES[i].durationFrames) {
      sceneIndex = i;
      sceneFrame = remaining;
      break;
    }
    remaining -= SCENES[i].durationFrames;
  }

  const scene = SCENES[sceneIndex];
  const progress = Math.min(sceneFrame / scene.durationFrames, 1);
  void fps;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(150deg, #060d1e 0%, #081224 50%, #050e20 100%)",
      fontFamily: "'Noto Sans KR', 'Malgun Gothic', sans-serif",
    }}>
      {/* Grid */}
      <AbsoluteFill style={{
        backgroundImage: `
          linear-gradient(rgba(80,144,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(80,144,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", top: -120, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,80,200,0.22) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -60,
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(20,60,160,0.18) 0%, transparent 70%)",
      }} />

      <Audio src={staticFile("bgm.mp3")} volume={0.4} />
      <scene.Component progress={progress} />
    </AbsoluteFill>
  );
}
