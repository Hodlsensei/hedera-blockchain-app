import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useHbarPrice } from "@/hooks/useHbarPrice";
import { products } from "@/pages/Products";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const { convertToHbar } = useHbarPrice();

  const product = products.find((p) => p.id === Number(id));

  const calculateItemTotal = (priceUsd: number, qty: number) => {
    return (priceUsd * qty).toFixed(2);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        priceUsd: product.priceUsd,
        image: product.image
      });
    }
    setQuantity(1);
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          <Link
            to="/products"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-smooth mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Playfair_Display']">
                {product.name}
              </h1>

              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    ${product.priceUsd}
                  </span>
                  <span className="text-base text-muted-foreground">USD</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  ≈ {convertToHbar(product.priceUsd)} HBAR per {product.quantity}
                </p>
              </div>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <Card className="border-border mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Quantity
                  </h3>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      className="border-border"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-semibold text-foreground w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      className="border-border"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="py-5">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total price:</p>
                      <p className="text-2xl font-bold text-primary">
                        ${calculateItemTotal(product.priceUsd, quantity)} USD
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ≈ {convertToHbar(product.priceUsd * quantity)} HBAR
                      </p>
                    </div>
                  </div>

                  {product.id !== 3 &&
                    product.id !== 5 &&
                    product.id !== 7 &&
                    product.id !== 8 &&
                    product.id !== 9 &&
                    product.id !== 10 &&
                    product.id !== 11 &&
                    product.id !== 12 &&
                    (quantity > 1 ? (
                      <p className="text-sm text-muted-foreground">
                        You are about to place an order for {quantity}{" "}
                        {product.quantities} of {product.name}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        You are about to place an order for {quantity}{" "}
                        {product.quantity} of {product.name}
                      </p>
                    ))}

                  {(product.id === 3 ||
                    product.id === 5 ||
                    product.id === 7 ||
                    product.id === 8) &&
                    (quantity > 1 ? (
                      <p className="text-sm text-muted-foreground">
                        You are about to place an order for {quantity}{" "}
                        {product.quantities}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        You are about to place an order for {quantity}{" "}
                        {product.quantity}
                      </p>
                    ))}

                  {(product.id === 9 ||
                    product.id === 10 ||
                    product.id === 12 ||
                    product.id === 11) &&
                    (quantity > 1 ? (
                      <p className="text-sm text-muted-foreground">
                        You are about to place an order for {quantity}{" "}
                        {product.quantities} of 5kg of {product.name}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        You are about to place an order for {quantity}{" "}
                        {product.quantity} of 5kg of {product.name}
                      </p>
                    ))}
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground text-lg py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Product Benefits
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ 100% Organic & Fresh</li>
                  <li>✓ Directly from Farm</li>
                  <li>✓ No Synthetic Pesticides</li>
                  <li>✓ Sustainable Farming Methods</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;