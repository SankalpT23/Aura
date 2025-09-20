import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Clock,
  Globe,
  Filter,
  Bookmark,
  Share,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: Date;
  category: string;
  impact: "high" | "medium" | "low";
  sentiment: "positive" | "negative" | "neutral";
  url: string;
  isBookmarked: boolean;
}

export default function News() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // BACKEND: fetch market news from provider (with sentiment) and cache server-side
  // AIML: run NER/topic modeling; generate impact/sentiment with model outputs
  const [newsItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Federal Reserve Signals Potential Rate Cut in Q4 2024",
      summary: "Fed Chair Jerome Powell hints at monetary policy easing amid cooling inflation data and labor market stabilization.",
      source: "Bloomberg",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      category: "monetary-policy",
      impact: "high",
      sentiment: "positive",
      url: "#",
      isBookmarked: false,
    },
    {
      id: "2",
      title: "AI Chip Demand Drives NVIDIA to Record Quarterly Earnings",
      summary: "NVIDIA reports 206% revenue growth year-over-year, beating analyst expectations on strong AI infrastructure demand.",
      source: "Reuters",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: "earnings",
      impact: "high",
      sentiment: "positive",
      url: "#",
      isBookmarked: true,
    },
    {
      id: "3",
      title: "Oil Prices Surge 4% on OPEC+ Production Cut Extension",
      summary: "Crude oil futures jump as OPEC+ members agree to extend production cuts through 2024, tightening global supply.",
      source: "CNBC",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: "commodities",
      impact: "medium",
      sentiment: "neutral",
      url: "#",
      isBookmarked: false,
    },
    {
      id: "4",
      title: "Tesla Faces Headwinds as EV Sales Growth Slows Globally",
      summary: "Global electric vehicle sales growth decelerates in Q3, with Tesla reporting first sequential delivery decline in over a year.",
      source: "Wall Street Journal",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: "automotive",
      impact: "medium",
      sentiment: "negative",
      url: "#",
      isBookmarked: false,
    },
    {
      id: "5",
      title: "Cryptocurrency Market Rallies on Institutional Adoption",
      summary: "Bitcoin and Ethereum surge as major pension funds and corporations increase crypto allocations in portfolios.",
      source: "CoinDesk",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: "crypto",
      impact: "medium",
      sentiment: "positive",
      url: "#",
      isBookmarked: true,
    },
    {
      id: "6",
      title: "European Markets Close Mixed on Banking Sector Concerns",
      summary: "STOXX 600 ends flat as banking stocks decline on regulatory concerns, offset by gains in technology and healthcare.",
      source: "Financial Times",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      category: "markets",
      impact: "low",
      sentiment: "neutral",
      url: "#",
      isBookmarked: false,
    },
  ]);

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">High Impact</Badge>;
      case "medium":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Medium Impact</Badge>;
      default:
        return <Badge className="bg-muted/20 text-muted-foreground border-muted/30">Low Impact</Badge>;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Globe className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", label: "All News", count: newsItems.length },
    { id: "markets", label: "Markets", count: newsItems.filter(n => n.category === "markets").length },
    { id: "earnings", label: "Earnings", count: newsItems.filter(n => n.category === "earnings").length },
    { id: "monetary-policy", label: "Fed Policy", count: newsItems.filter(n => n.category === "monetary-policy").length },
    { id: "crypto", label: "Crypto", count: newsItems.filter(n => n.category === "crypto").length },
    { id: "commodities", label: "Commodities", count: newsItems.filter(n => n.category === "commodities").length },
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Market News</h1>
          <p className="text-muted-foreground">
            Real-time financial news and market-moving events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="aura-button-primary">
            <Bookmark className="w-4 h-4 mr-2" />
            Bookmarks
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="aura-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search financial news, companies, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-muted/50 border-border focus:border-primary"
          />
        </div>
      </Card>

      {/* Categories and News */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card className="aura-card p-4">
            <h2 className="font-semibold text-foreground mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className={`w-full justify-between h-10 ${
                    selectedCategory === category.id ? "aura-button-primary" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.label}</span>
                  <Badge variant="outline" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* News Feed */}
        <div className="lg:col-span-3 space-y-4">
          {filteredNews.length === 0 ? (
            <Card className="aura-card p-12 text-center">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No news found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
            </Card>
          ) : (
            filteredNews.map((item) => (
              <Card key={item.id} className="aura-card p-6 hover:shadow-lg transition-all duration-200">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getSentimentIcon(item.sentiment)}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{item.source}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(item.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getImpactBadge(item.impact)}
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Full Article
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Bookmark className={`w-4 h-4 ${item.isBookmarked ? "fill-primary text-primary" : ""}`} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}