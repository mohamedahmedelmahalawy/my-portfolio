"use client";

import { Canvas } from "@react-three/fiber";
import { Planet } from "../3d/Planet";

import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../animated-header-section/AnimatedHeaderSection";

function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen ">
      <AnimatedHeaderSection
        subTitle="404 No Bugs Found"
        title="Mohamed Elmahalawy"
        text={`I empower brands and startups to dominate their market 
                  with high-impact, premium web and app solutions 
                  that drive real growth.`}
        textColor="text-black"
      />
      <figure className="absolute inset-0 -z-50 w-screen h-screen">
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <group scale={isMobile ? 0.7 : 1}>
              <Planet />
            </group>
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[5, -2, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
}

export default Hero;
