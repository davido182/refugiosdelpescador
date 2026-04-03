import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group">
            <span className={`font-display text-xl md:text-2xl transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-cream"
            }`}>
              Refugios del Pescador
            </span>
          </a>

          {/* CTA */}
          <Button 
            variant={isScrolled ? "ocean" : "heroOutline"} 
            size="sm"
            onClick={scrollToReserva}
          >
            Reservar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
