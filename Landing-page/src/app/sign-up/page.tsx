"use client";
import { SignUp } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import AuthSuccess from '@/components/landing/AuthSuccess';

export default function SignUpPage() {
  const { isSignedIn } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      setShowSuccess(true);
    }
  }, [isSignedIn]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center aura-glow">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AURA 2.0</h1>
          <p className="text-muted-foreground">
            Your Real-Time Financial Intelligence Assistant
          </p>
        </div>
        <SignUp 
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
      </div>
      
      {showSuccess && (
        <AuthSuccess onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}
