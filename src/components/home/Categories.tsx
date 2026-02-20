import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Apple, Wrench, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Sprout,
    title: "Crops & Vegetables",
    description: "Fresh seasonal crops",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Apple,
    title: "Fruits & Berries",
    description: "Sweet organic fruits",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    icon: Wrench,
    title: "Farming Services",
    description: "Expert consultation",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BookOpen,
    title: "Growing Guides",
    description: "Learn from experts",
    color: "bg-primary-light/10 text-primary",
  },
];

const Categories = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Playfair_Display']">
            Discover Our Offers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of products and services tailored to meet
            your agricultural needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index}>
              <Card className="group cursor-pointer border-border hover:shadow-medium transition-smooth h-full">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-smooth`}
                  >
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
