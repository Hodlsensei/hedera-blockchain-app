import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import vegetablesImg from "@/assets/vegetables.jpg";
import fruitsImg from "@/assets/fruits.jpg";
import grainsImg from "@/assets/grains.jpg";

const products = [
  {
    id: 1,
    name: "Fresh Vegetables",
    image: vegetablesImg,
    description: "Organic vegetables picked fresh daily",
  },
  {
    id: 2,
    name: "Seasonal Fruits",
    image: fruitsImg,
    description: "Sweet, juicy fruits from local orchards",
  },
  {
    id: 3,
    name: "Premium Grains",
    image: grainsImg,
    description: "Whole grains harvested with care",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Playfair_Display']">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked selection of our finest organic products, grown with care and harvested at peak freshness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border-border hover:shadow-large transition-smooth cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>
                <Link to="/products">
                  <Button 
                    variant="ghost" 
                    className="w-full text-primary hover:text-primary-light hover:bg-muted group/btn"
                  >
                    View Collection
                    <ArrowRight className="ml-2 w-4 h-4 transition-smooth group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
