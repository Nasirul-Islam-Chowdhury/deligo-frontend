import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  UtensilsCrossed,
  Car,
  Clock,
  Shield,
  Zap,
  Star,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { useRouter } from "next/navigation";

export default function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getUserInfo();
  const router = useRouter();

  const handleSignOut = async () => {
    removeUser();

    await deleteCookies(["accessToken", "refreshToken"]);

    router.push("/login");

    router.refresh();
  };

  return (
    <nav className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-primary-foreground">
            D
          </div>
          <span className="text-2xl font-bold">DeliGo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="/restaurents"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Restaurents
          </Link>
          <Link
            href="/rides"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Rides
          </Link>
          {user?.userId && (
            <Link
              href={`/dashboard/${user?.role}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!user?.userId ? (
            <Link href="/login" className="hidden md:block">
              <Button
                variant="outline"
                className="border-border hover:bg-secondary bg-transparent"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <>
              <Button onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="/restaurents"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Restaurents
            </Link>
            <Link
              href="/rides"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rides
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full border-border hover:bg-secondary bg-transparent"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
