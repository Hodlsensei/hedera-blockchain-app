import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-['Playfair_Display'] animate-fade-in">
          Farm Fresh, Naturally Grown
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Discover premium organic produce from sustainable farms. Quality you can trust, 
          freshness delivered to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link to="/products">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-light text-primary-foreground font-semibold px-8 shadow-large transition-smooth"
            >
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground font-semibold px-8 transition-smooth"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
