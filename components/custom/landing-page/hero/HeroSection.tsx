import HeroContent from "./HeroContent";
import HeroHeader from "./HeroHeader";

const HeroSection = () => {
  return (
    <section className=" w-full h-52 rounded-lg flex flex-col items-start">
      {/* navigation header */}
      <HeroHeader />

      {/* main content */}
      <HeroContent />
    </section>
  );
};

export default HeroSection;
