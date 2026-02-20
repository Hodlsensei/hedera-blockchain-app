import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Leaf, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-smooth group-hover:scale-110">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-['Playfair_Display']">
              AgroFresh
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/products"
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className={`${getTotalItems() > 0 && "animate-bounce"}`}
            >
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <Button variant="ghost" size="icon" onClick={() => signOut()}>
                  <LogOut className="w-5 h-5" />
                </Button>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="text-foreground hover:text-primary transition-smooth font-medium text-left"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
