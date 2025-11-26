import Hero from "./_components/Hero";
import Header from "./_components/Header";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <Hero />
    </main>
  );
}
