import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import SpaceSection from "@/components/SpaceSection";
import GuestSection from "@/components/GuestSection";
import ExperienceSection from "@/components/ExperienceSection";
import LocationSection from "@/components/LocationSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://refugiosdelpescador.com/" />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <StorySection />
        <SpaceSection />
        <GuestSection />
        <ExperienceSection />
        <LocationSection />
        <ReservationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
