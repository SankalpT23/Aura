"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Wallet, Eye, EyeOff, Shield, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // BACKEND: authenticate credentials against auth service and issue tokens
    // BACKEND: handle MFA/SSO providers and error states
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to AURA 2.0",
        description: "Successfully logged in to your financial intelligence dashboard.",
      });
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center">
              <Wallet className="w-8 h-8 text-[var(--primary-foreground)]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AURA 2.0</h1>
          <p className="text-muted-foreground">
            Your Real-Time Financial Intelligence Assistant
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-muted/50 border-border focus:border-[var(--primary)] transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-muted/50 border-border focus:border-[var(--primary)] pr-10 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Button
                variant="link"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80 p-0 h-auto font-medium"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 font-semibold text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Button variant="link" className="text-[var(--primary)] hover:text-[var(--primary)]/80 p-0 h-auto font-medium">
                Create Account
              </Button>
            </p>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Shield className="w-4 h-4" />
            <span>Protected by enterprise-grade security</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <TrendingUp className="w-6 h-6 text-[var(--primary)] mx-auto" />
            <p className="text-sm font-medium text-foreground">Real-time Analytics</p>
            <p className="text-xs text-muted-foreground">Live market insights</p>
          </div>
          <div className="space-y-2">
            <Wallet className="w-6 h-6 text-[var(--primary)] mx-auto" />
            <p className="text-sm font-medium text-foreground">Portfolio Management</p>
            <p className="text-xs text-muted-foreground">Intelligent tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
