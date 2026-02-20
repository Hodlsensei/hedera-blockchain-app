import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useHbarPrice } from "@/hooks/useHbarPrice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const checkoutSchema = z.object({
  name: z.string().min(2, "Please input your full name").max(100),
  phone1: z.string().min(10, "Please input your main phone number").max(15),
  phone2: z
    .string()
    .min(10, "Please input your secondary phone number")
    .max(15),
  address: z.string().min(10, "Please input your address").max(500),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ORD-${timestamp}-${random}`;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, getTransportationFee, getFinalTotal } =
    useCart();
  const { user, loading } = useAuth();
  const { convertToHbar } = useHbarPrice();
  const [orderId] = useState(() => generateOrderId());

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone1: "",
      phone2: "",
      address: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    const checkoutData = {
      ...data,
      orderId,
      orderDate: new Date().toISOString(),
    };
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="bg-muted/30 py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Playfair_Display']">
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Fill in your details to complete your order
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="border-border sticky top-20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="mb-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Order ID
                      </p>
                      <p className="font-mono text-sm font-semibold">
                        {orderId}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          try {
                            navigator.clipboard.writeText(orderId);
                            toast.success("Order ID copied to clipboard");
                          } catch (e) {
                            toast.error("Failed to copy Order ID");
                          }
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {item.name} x {item.quantity}
                          </span>
                          <div className="text-right">
                            <div className="font-medium">
                              ${(item.priceUsd * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ≈ {convertToHbar(item.priceUsd * item.quantity)} HBAR
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <div className="text-right">
                          <div className="font-medium">
                            ${getTotalPrice().toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ≈ {convertToHbar(getTotalPrice())} HBAR
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Transportation Fee
                        </span>
                        <div className="text-right">
                          <div className="font-medium">
                            ${getTransportationFee().toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ≈ {convertToHbar(getTransportationFee())} HBAR
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-border pt-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">Total</span>
                          <div className="text-right">
                            <div className="font-bold text-xl text-primary">
                              ${getFinalTotal().toFixed(2)} USD
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ≈ {convertToHbar(getFinalTotal())} HBAR
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+0987654321" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter your complete delivery address"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Proceed to Payment
                      </Button>
                    </form>
                  </Form>
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

export default Checkout;