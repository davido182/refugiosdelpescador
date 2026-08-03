import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToReserva = () => {
    document.getElementById('reserva')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-soft py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-3">
            <img
              src={logo}
              alt="Refugios del Pescador"
              className={`h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-300 ${
                isScrolled ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
              }`}
              width={96}
              height={96}
            />
            <span className={`font-display text-xl md:text-2xl transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-cream"
            }`}>
              Refugios del Pescador
            </span>
          </a>


          <div className="flex items-center gap-3">
            <LanguageSwitcher inverted={!isScrolled} />

            <Button 
              variant={isScrolled ? "ocean" : "heroOutline"} 
              size="sm"
              onClick={scrollToReserva}
            >
              {t.nav.book}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
