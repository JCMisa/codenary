import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full relative h-screen overflow-hidden">
      <Image
        src={"/hero.gif"}
        alt="hero-banner"
        width={1000}
        height={1000}
        className="w-full h-full object-cover absolute inset-0"
      />

      <div className="absolute w-full flex flex-col items-center mt-24">
        <h2 className="font-bold text-7xl font-game">Start Your</h2>
        <h1
          className="font=bold text-8xl font-game text-yellow-400"
          style={{
            textShadow:
              "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
          }}
        >
          Coding Adventure
        </h1>

        <h5 className="mt-5 font-game text-3xl">
          Beginner friendly coding courses and projects
        </h5>

        <Button variant={"pixel"} className="font-game text-3xl p-6 mt-7">
          START LEARNING
        </Button>
      </div>
    </section>
  );
};

export default Hero;
