import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTransportationFee,
    getFinalTotal,
  } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Add some products to get started
            </p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const calculateItemTotal = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="bg-muted/30 py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Playfair_Display']">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              Review your items and checkout with Hedera
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold mb-2  ">
                          {calculateItemTotal(item.price, item.quantity)}
                          <sub className="italic text-xs pl-1">HBAR</sub>
                        </p>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="lg:col-span-1">
              <Card className="border-border sticky top-20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium flex flex-row">
                        {getTotalPrice().toFixed(2)}
                        <p className="text-xs italic">
                          <sub>HBAR</sub>
                        </p>
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Transportation Fee
                      </span>
                      <span className="font-medium flex flex-row">
                        {getTransportationFee().toFixed(2)}
                        <p className="text-xs italic">
                          <sub>HBAR</sub>
                        </p>
                      </span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total (HBAR)</span>
                        <span className="text-primary flex flex-row ">
                          {getFinalTotal().toFixed(2)}
                          <p>
                            <sub className="text-xs italic">HBAR</sub>
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>

                  {user ? (
                    <Button
                      className="w-full"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed to Checkout
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => navigate("/auth")}
                    >
                      Sign in to Checkout
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
