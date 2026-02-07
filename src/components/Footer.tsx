const Footer = () => {
  return (
    <footer className="py-16 bg-primary text-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Name */}
          <h3 className="font-display text-3xl md:text-4xl mb-4">
            El Refugio del Pescador
          </h3>
          
          <p className="font-body text-cream/70 mb-8">
            Islas Galápagos, Ecuador
          </p>

          {/* Decorative wave */}
          <div className="flex justify-center mb-8">
            <svg className="w-24 h-6 text-cream/20" viewBox="0 0 100 20" fill="currentColor">
              <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10 V 20 H 0 Z" opacity="0.5"/>
            </svg>
          </div>

          {/* Tagline */}
          <p className="font-display text-xl italic text-cream/80 mb-12">
            "Donde el mar te invita a quedarte"
          </p>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/50">
            <p className="font-body">
              © {new Date().getFullYear()} El Refugio del Pescador. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-cream transition-colors">Política de privacidad</a>
              <a href="#" className="hover:text-cream transition-colors">Términos de uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
