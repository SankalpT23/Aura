import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center aura-glow mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-xl">A</span>
          </div>
          <p className="text-muted-foreground">Loading AURA Dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    // BACKEND: hydrate user/session context here (e.g., fetch /me) and pass down
    // BACKEND: initialize WebSocket connections for real-time updates if authenticated
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        </main>
        
        <Toaster />
      </div>
    </SidebarProvider>
  );
}