import { Leaf, Shield, Users, Award } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "All our products are certified organic, grown without harmful chemicals or pesticides",
  },
  {
    icon: Shield,
    title: "Sustainable Farming",
    description: "We practice eco-friendly farming methods that protect our environment for future generations",
  },
  {
    icon: Users,
    title: "Expert Farmers",
    description: "Our team of experienced farmers brings generations of agricultural knowledge",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Every product undergoes rigorous quality checks before reaching your table",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Playfair_Display']">
            Why Choose AgroFresh?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to bringing you the finest agricultural products through sustainable practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-smooth">
                <benefit.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-smooth" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
