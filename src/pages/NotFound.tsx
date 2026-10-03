import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://refugiosdelpescador.com";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const canonical = `${SITE_URL}${location.pathname}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Helmet>
        <title>Página no encontrada (404) | Refugios del Pescador</title>
        <meta
          name="description"
          content="Esta página no existe. Vuelve al inicio para ver el alojamiento Refugios del Pescador en San Cristóbal, Galápagos."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Página no encontrada (404) | Refugios del Pescador" />
        <meta
          property="og:description"
          content="Esta página no existe. Vuelve al inicio para ver el alojamiento en San Cristóbal, Galápagos."
        />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content="Página no encontrada (404) | Refugios del Pescador" />
        <meta
          name="twitter:description"
          content="Esta página no existe. Vuelve al inicio para ver el alojamiento en San Cristóbal, Galápagos."
        />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Página no encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
