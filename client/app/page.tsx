import Image from "next/image";
import Hero from "./components/Hero";
import Slider from "./components/Slider";
import Container from "./components/Container";
import Community from "./components/Community";
import Reviews from "./components/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-[-200px]">
        <Slider />
      </div>
      <Container />
      <Community />
      <Reviews />
    </>
  );
}
