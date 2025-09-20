"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, User, LogOut } from "lucide-react";
import DashboardMockup from "./DashboardMockup";
import AnimatedLineGraph from "./AnimatedLineGraph";
import ScrollingSignup from "./ScrollingSignup";
import { motion, useScroll, useSpring } from "framer-motion";
import { useAuth, useUser } from "@clerk/nextjs";

export default function AuraLanding() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } } as const;
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } } as const;
  const { isSignedIn, isLoaded } = useAuth();
  const { user, signOut } = useUser();

  // Debug logging
  console.log('Auth state:', { isSignedIn, isLoaded, user: user?.emailAddresses?.[0]?.emailAddress });

  const handleGetStarted = () => {
    // Redirect to sign-up page
    router.push("/sign-up");
  };

  return (
    <div className="relative overflow-hidden scroll-smooth">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] bg-[var(--primary)] origin-left shadow-[0_0_20px_#FF6B35AA]"
        style={{ scaleX }}
      />
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[var(--primary)] shadow-[0_0_24px_#FF6B3580] grid place-content-center text-[var(--primary-foreground)] font-bold">A</div>
            <span className="font-semibold !whitespace-pre-line">AURA</span>
            <Badge variant="secondary" className="ml-2 bg-white/10 text-[var(--muted-foreground)]">Financial Intelligence</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-[var(--muted-foreground)]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#growth" className="hover:text-white transition-colors">Growth</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#footer" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex text-[var(--muted-foreground)] hover:text-white">Docs</Button>
            
            {!isLoaded ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm text-white/70">Loading...</span>
              </div>
            ) : isSignedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    {user?.imageUrl ? (
                      <img 
                        src={user.imageUrl} 
                        alt={user.fullName || "User"} 
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user?.fullName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || "User"}
                  </span>
                </div>
                <Button 
                  onClick={() => window.open('http://localhost:8080', '_blank')}
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-[0_0_24px_#FF6B3533]"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => signOut()}
                  className="text-[var(--muted-foreground)] hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => router.push("/sign-in")}
                  className="text-[var(--muted-foreground)] hover:text-white"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleGetStarted}
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-[0_0_24px_#FF6B3533]"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_top,#FF6B351a,transparent_60%)]" />
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#27AE6014,transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight !whitespace-pre-line">AURA : Your Real-Time Financial Intelligence Assistant

              </h1>
              <p className="mt-4 text-[var(--muted-foreground)] text-base sm:text-lg max-w-xl">
                Stay ahead of the market with AI-powered insights, anomaly alerts, and personalized portfolio analysis.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGetStarted}
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-[0_0_40px_#FF6B3533] px-6"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
          { title: "AI Assistant", desc: "Chat with AURA for instant financial answers.", icon: "🤖" },
          { title: "Anomaly Alerts", desc: "Real-time risk detection with FinRL.", icon: "⚠️" },
          { title: "Market Insights", desc: "Curated news from live feeds.", icon: "📰" },
          { title: "Portfolio Dashboard", desc: "Track balance, P&L, and investments.", icon: "📊" }].
          map((f) =>
          <motion.div
              key={f.title}
              variants={fadeUp}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_0_24px_#00000040] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_#FF6B351a]"
            >
              <div className="text-2xl select-none">{f.icon}</div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{f.desc}</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Growth Visual */}
      <section id="growth" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">Track performance and make smarter moves with AI-driven clarity.</h2>
            <ul className="mt-4 space-y-2 text-[var(--muted-foreground)]">
              {[
              "Real-time P&L with trend projections",
              "AI anomaly detection and risk scoring",
              "Personalized portfolio rebalancing suggestions"].
              map((t) =>
              <li key={t} className="flex items-start gap-2"><Check className="h-5 w-5 text-[var(--secondary)]" /> <span>{t}</span></li>
              )}
            </ul>
          </motion.div>
          <AnimatedLineGraph />
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
          '"AURA helped me detect a risky transaction before it hurt my portfolio!"',
          '"The anomaly alerts are spot-on and saved me hours each week."',
          '"Exactly the clarity I needed to act confidently."'].
          map((quote, i) =>
          <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_#27AE601a]"
            >
              <p className="text-sm text-[var(--muted-foreground)]">{quote}</p>
            </motion.div>
          )}
        </motion.div>
        <div className="mt-8 flex flex-wrap items-center gap-6 opacity-80">
          <span className="text-xs text-[var(--muted-foreground)] !whitespace-pre-line"></span>
          <div className="flex items-center gap-6">
            <span className="text-sm !whitespace-pre-line"></span>
            <span className="text-sm !whitespace-pre-line"></span>
            <span className="text-sm !whitespace-pre-line"></span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_#FF6B351a]"
          >
            <h3 className="text-xl font-semibold">Free</h3>
            <p className="mt-1 text-[var(--muted-foreground)]">Demo access to explore the dashboard.</p>
            <div className="mt-6">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--secondary)]" /><span>Dashboard preview</span></div>
              <div className="flex items-center gap-2 mt-2"><Check className="h-4 w-4 text-[var(--secondary)]" /><span>Sample insights</span></div>
            </div>
            <Button 
              onClick={handleGetStarted}
              className="mt-6 w-full bg-[var(--primary)] text-[var(--primary-foreground)]"
            >
              Start Free Today
            </Button>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 ring-1 ring-[var(--primary)]/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_#FF6B351a]"
          >
            <h3 className="text-xl font-semibold">Premium</h3>
            <p className="mt-1 text-[var(--muted-foreground)]">Full access, anomaly alerts, and AI insights.</p>
            <div className="mt-6">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--secondary)]" /><span>Real-time anomaly alerts</span></div>
              <div className="flex items-center gap-2 mt-2"><Check className="h-4 w-4 text-[var(--secondary)]" /><span>AI assistant for financial queries</span></div>
              <div className="flex items-center gap-2 mt-2"><Check className="h-4 w-4 text-[var(--secondary)]" /><span>Portfolio optimization tips</span></div>
            </div>
            <Button 
              onClick={handleGetStarted}
              className="mt-6 w-full bg-[var(--primary)] text-[var(--primary-foreground)]"
            >
              Upgrade
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-[var(--border)] bg-[var(--background)]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[var(--primary)]" />
              <span className="font-semibold">AURA</span>
            </div>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">Real-Time Financial Intelligence Assistant</p>
          </div>
          <div className="flex md:justify-end items-center gap-6 text-sm">
            <Link href="#" className="hover:text-white">About</Link>
            <Link href="#" className="hover:text-white">Docs</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
            <Link href="https://github.com" target="_blank" className="hover:text-white">GitHub</Link>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[var(--primary)] via-white/0 to-[var(--secondary)] opacity-40" />
      </footer>
      
      {/* Scrolling Signup Component - Only show when not signed in */}
      {!isSignedIn && <ScrollingSignup />}
    </div>);

}