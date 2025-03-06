
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Centers", to: "/centers" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
          >
            RecFit
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  "text-base font-medium transition-colors",
                  location.pathname === item.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <UserMenu />
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            RecFit
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-6 flow-root px-6">
          <div className="space-y-6 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  "block text-base font-medium transition-colors",
                  location.pathname === item.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
