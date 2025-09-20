"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink } from "lucide-react";

interface AuthSuccessProps {
  onClose: () => void;
}

export default function AuthSuccess({ onClose }: AuthSuccessProps) {
  const openDashboard = () => {
    window.open('http://localhost:8080', '_blank');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to AURA!
          </h2>
          
          <p className="text-muted-foreground mb-6">
            You've successfully signed in. Your financial intelligence dashboard is ready.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={openDashboard}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Dashboard
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Stay on Landing Page
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
