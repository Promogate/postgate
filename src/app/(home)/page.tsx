import { Hero } from "@/components/hero";
import { HomeNavigation } from "@/components/home-navigation";

export default function Home() {

  return (
    <main>
      <nav className="flex justify-center items-center h-24">
        <HomeNavigation.Root />
      </nav>
      <Hero.Root />
    </main>
  );
}
