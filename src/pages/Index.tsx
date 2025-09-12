import HeroSection from "@/components/HeroSection";
import ChatSection from "@/components/ChatSection";
import SearchSection from "@/components/SearchSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ExpertiseSection />
      <SearchSection />
      <ChatSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};

export default Index;
