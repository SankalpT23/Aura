import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Wallet, Eye, EyeOff, Shield, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center aura-glow">
              <Wallet className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AURA 2.0</h1>
          <p className="text-muted-foreground">
            Your Real-Time Financial Intelligence Assistant
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
              card: 'bg-card border border-border shadow-lg',
              headerTitle: 'text-foreground',
              headerSubtitle: 'text-muted-foreground',
              socialButtonsBlockButton: 'border-border hover:bg-muted',
              formFieldInput: 'bg-muted/50 border-border focus:border-primary',
              footerActionLink: 'text-primary hover:text-primary/80',
            }
          }}
        />

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
            <TrendingUp className="w-6 h-6 text-primary mx-auto" />
            <p className="text-sm font-medium text-foreground">Real-time Analytics</p>
            <p className="text-xs text-muted-foreground">Live market insights</p>
          </div>
          <div className="space-y-2">
            <Wallet className="w-6 h-6 text-primary mx-auto" />
            <p className="text-sm font-medium text-foreground">Portfolio Management</p>
            <p className="text-xs text-muted-foreground">Intelligent tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
}