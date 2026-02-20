import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useHbarPrice } from "@/hooks/useHbarPrice";
import grainsImg from "@/assets/grains.jpg";
import carrot from "@/assets/carrot.jpg";
import tomatoes from "@/assets/tomatoes.jpg";
import cucumber from "@/assets/cucumber.jpg";
import sweetPepper from "@/assets/sweet pepper.jpg";
import apples from "@/assets/apples.jpg";
import orange from "@/assets/orange.jpg";
import pineApples from "@/assets/pineApples.jpg";
import waterMelon from "@/assets/waterMelon.jpg";
import wheat from "@/assets/wheat.jpg";
import oat from "@/assets/oat.jpg";
import rice from "@/assets/rice.jpg";
import Quinoa from "@/assets/Quinoa.jpg";
import eggs from "@/assets/eggs.jpg";
import { Link } from "react-router-dom";

export const products = [
  {
    id: 1,
    name: "Tomatoes",
    category: "vegetables",
    priceUsd: 4.99,
    image: tomatoes,
    quantity: "bowl",
    quantities: "bowls",
    description:
      "Fresh, vine-ripened organic tomatoes grown without synthetic pesticides. Perfect for salads, sauces, and cooking. Rich in vitamins and antioxidants.",
  },
  {
    id: 2,
    quantity: "bunch",
    quantities: "bunches",
    name: "Fresh Carrots",
    category: "vegetables",
    priceUsd: 3.49,
    image: carrot,
    description:
      "Crisp and sweet organic carrots, packed with beta-carotene and fiber. Ideal for snacking, juicing, or adding to your favorite dishes.",
  },
  {
    id: 3,
    name: "cucumber",
    quantity: "cucumber",
    quantities: "cucumbers",
    category: "vegetables",
    priceUsd: 5.99,
    image: cucumber,
    description:
      "Cucumber is a green, elongated vegetable with high water content, commonly eaten fresh in salads or pickled. It belongs to the gourd family and is known for its refreshing, mild flavor and cool, crisp texture.",
  },
  {
    id: 4,
    name: "Sweet Peppers",
    category: "vegetables",
    priceUsd: 6.49,
    quantity: "bowl",
    quantities: "bowls",
    image: sweetPepper,
    description:
      "Colorful, crunchy sweet bell peppers grown organically. High in vitamin C and perfect for grilling, stuffing, or eating raw.",
  },
  {
    id: 5,
    name: "Apples",
    category: "fruits",
    priceUsd: 7.99,
    image: apples,
    quantity: "apple",
    quantities: "apples",
    description:
      "Crisp and juicy organic apples, naturally grown without chemicals. Great for snacking, baking, or making fresh juice.",
  },
  {
    id: 6,
    name: "oranges",
    category: "fruits",
    quantity: "bowl",
    quantities: "bowls",
    priceUsd: 8.99,
    image: orange,
    description:
      "An orange is a pocket of sunshine. Its bright, textured skin guards juicy segments within, each bursting with a vibrant mix of sweet and tangy flavor. A simple, bright joy.",
  },
  {
    id: 7,
    name: "Pineapples",
    category: "fruits",
    priceUsd: 12,
    quantity: "Pineapple",
    quantities: "Pineapples",
    image: pineApples,
    description:
      "The pineapple is a spiky, golden fortress. Its tough, diamond-patterned skin protects an intensely sweet and tangy treasure within. To taste its vibrant yellow flesh is to experience a tropical sunset—a bold, juicy, and sun-warmed delight.",
  },
  {
    id: 8,
    name: "watermelon",
    category: "fruits",
    priceUsd: 17.0,
    quantity: "watermelon",
    quantities: "watermelons",
    image: waterMelon,
    description:
      "A green-striped cannonball of summer. Crack it open to a burst of red, sweet, and dripping juice. Pure, sun-ripened refreshment.",
  },
  {
    id: 9,
    name: " Wheat",
    category: "grains",
    quantity: "bag",
    quantities: "bags",
    priceUsd: 12.99,
    image: wheat,
    description:
      "Stone-ground organic whole wheat flour, rich in fiber and nutrients. Perfect for baking bread, pastries, and healthy meals.",
  },
  {
    id: 10,
    name: "Oats",
    category: "grains",
    quantity: "bag",
    quantities: "bags",
    priceUsd: 8.49,
    image: oat,
    description:
      "Premium organic rolled oats, ideal for a nutritious breakfast. High in fiber and great for oatmeal, baking, and smoothies.",
  },
  {
    id: 11,
    name: "Rice",
    category: "grains",
    priceUsd: 15,
    quantity: "bag",
    quantities: "bags",
    image: rice,
    description:
      "The rice grain is a vital global food source, which when milled produces nutritious brown rice or polished white rice.",
  },
  {
    id: 12,
    name: "Quinoa",
    category: "grains",
    quantity: "bag",
    quantities: "bags",
    priceUsd: 14.99,
    image: Quinoa,
    description:
      "Organic quinoa, a complete protein source with all essential amino acids. Versatile and perfect for salads, bowls, and side dishes.",
  },
  {
    id: 13,
    name: "Egg",
    category: "Animal produce",
    quantity: "crate",
    quantities: "crates",
    priceUsd: 20.0,
    image: eggs,
    description:
      "A perfect, portable package. A fragile, brown or white shell holding liquid gold.Crack it open to reveal the sun and the cloud: a golden yolk anchored in clear, slick white. A simple promise of breakfast, of life, of potential. The essential ingredient.",
  },
];

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const { addToCart } = useCart();
  const { convertToHbar } = useHbarPrice();

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const priceMatch =
      product.priceUsd >= priceRange[0] && product.priceUsd <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="bg-muted/30 py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Playfair_Display']">
              Our Products
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse our complete collection of fresh, organic agricultural
              products
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <Card className="sticky top-20 border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Filters</h3>

                  <div className="mb-6">
                    <h4 className="font-medium text-sm mb-3 text-foreground">
                      Categories
                    </h4>
                    <div className="space-y-3">
                      {["vegetables", "fruits", "grains", "Animal produce"].map(
                        (category) => (
                          <div
                            key={category}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={category}
                              className="text-sm capitalize cursor-pointer text-muted-foreground hover:text-foreground transition-smooth"
                            >
                              {category}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-3 text-foreground">
                      Price Range
                    </h4>
                    <Slider
                      min={0}
                      max={20}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <p>${priceRange[0]}</p>
                      <p>${priceRange[1]}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="flex-1">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-border hover:shadow-medium transition-smooth h-full"
                  >
                    <Link to={`/products/${product.id}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-primary">
                            ${product.priceUsd}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ≈ {convertToHbar(product.priceUsd)} HBAR
                          </span>
                          <span className="text-xs text-muted-foreground">
                            per {product.quantity}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary-light text-primary-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart({
                              id: product.id.toString(),
                              name: product.name,
                              priceUsd: product.priceUsd,
                              image: product.image
                            });
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;