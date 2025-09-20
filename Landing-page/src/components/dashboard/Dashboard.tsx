import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Activity,
} from "lucide-react";
import { PortfolioChart } from "./PortfolioChart";
import { RecentTransactions } from "./RecentTransactions";

export default function Dashboard() {
  // BACKEND: fetch portfolio summary stats for the authenticated user (balances, P&L, risk)
  // AIML: attach model-driven insights/explanations for changes and risk attribution
  const portfolioStats = [
    {
      title: "Total Balance",
      value: "$2,847,392.50",
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
      description: "vs last month",
    },
    {
      title: "Total Investment",
      value: "$1,245,680.00",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      description: "Active positions",
    },
    {
      title: "Monthly P&L",
      value: "$47,250.80",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Risk Score",
      value: "7.2/10",
      change: "-0.3",
      trend: "down",
      icon: Activity,
      description: "Risk assessment",
    },
  ];

  // BACKEND: optionally load available actions from server/feature flags
  const quickActions = [
    { title: "Transfer Funds", icon: ArrowUpRight, color: "primary" },
    { title: "Buy Assets", icon: TrendingUp, color: "success" },
    { title: "View Reports", icon: PieChart, color: "secondary" },
    { title: "AI Analysis", icon: Activity, color: "warning" },
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Good morning, Investor</h1>
          <p className="text-muted-foreground">
            Stay on top of your portfolio, monitor market trends, and track performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Markets Open
          </Badge>
          {/* AIML: trigger AI Insights modal/panel by calling your AI service */}
          <Button className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90">
            <TrendingUp className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Portfolio Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.trend === 'up' ? 'bg-success/20' : 'bg-warning/20'}`}>
                <stat.icon className={`w-6 h-6 ${stat.trend === 'up' ? 'text-success' : 'text-warning'}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-success' : 'text-warning'}`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance Chart */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Portfolio Performance</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">1D</Button>
                <Button variant="outline" size="sm">1W</Button>
                <Button variant="outline" size="sm" className="bg-[var(--primary)] text-[var(--primary-foreground)]">1M</Button>
                <Button variant="outline" size="sm">1Y</Button>
              </div>
            </div>
            {/* BACKEND: provide time-series portfolio data via props or a hook */}
            {/* AIML: overlay forecasts/anomaly markers from prediction models */}
            <PortfolioChart />
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-12 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/50 transition-all duration-200"
                >
                  <action.icon className="w-5 h-5 mr-3" />
                  {action.title}
                </Button>
              ))}
            </div>
          </Card>

          {/* Market Status */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Market Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">S&P 500</span>
                <div className="text-right">
                  {/* BACKEND: replace with live market index data */}
                  <p className="font-medium text-foreground">4,567.23</p>
                  <p className="text-xs text-success">+1.2%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">NASDAQ</span>
                <div className="text-right">
                  {/* BACKEND: replace with live market index data */}
                  <p className="font-medium text-foreground">14,223.45</p>
                  <p className="text-xs text-success">+0.8%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Crypto Index</span>
                <div className="text-right">
                  {/* BACKEND: replace with live market index data */}
                  <p className="font-medium text-foreground">67,890.12</p>
                  <p className="text-xs text-warning">-2.1%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Activities</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        {/* BACKEND: fetch recent transactions for the user; paginate on server */}
        {/* AIML: optional categorization/fraud detection tags per transaction */}
        <RecentTransactions />
      </Card>
    </div>
  );
}
