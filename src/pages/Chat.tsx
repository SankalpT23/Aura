import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Lightbulb,
  MoreVertical,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
  timestamp: Date;
  suggestions?: string[];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm AURA, your AI financial assistant. I can help you analyze your portfolio, provide market insights, and answer investment questions. What would you like to know?",
      type: "assistant",
      timestamp: new Date(),
      suggestions: ["Analyze my portfolio", "Market trends today", "Risk assessment", "Investment opportunities"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // AIML: send user prompt to AI inference API and stream tokens back
    // BACKEND: include auth/session, user context, and RAG retrieval metadata
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        type: "assistant",
        timestamp: new Date(),
        suggestions: getResponseSuggestions(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // AIML: replace with server-side LLM call; keep this for UI fallback/dev
  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("portfolio")) {
      return "Based on your current portfolio analysis, you have a well-diversified investment mix with 65% stocks, 25% bonds, and 10% alternative investments. Your YTD return is +12.5%, outperforming the S&P 500 by 2.3%. I recommend considering rebalancing your tech allocation which is currently at 23% of your equity holdings.";
    }
    
    if (lowerInput.includes("market") || lowerInput.includes("trend")) {
      return "Current market conditions show mixed signals. The Fed's recent policy stance has created volatility in bond markets, while tech stocks are showing resilience. Key trends: AI/ML sector growth (+18% this quarter), renewable energy consolidation, and emerging market recovery. Risk factors include inflation persistence and geopolitical tensions.";
    }
    
    if (lowerInput.includes("risk")) {
      return "Your current risk profile is 7.2/10 (Moderate-Aggressive). This is slightly above your target of 6.5/10 due to recent tech stock gains. I suggest taking some profits in overperforming positions and increasing defensive allocations. Your Sharpe ratio of 1.34 indicates good risk-adjusted returns.";
    }
    
    return "I understand you're asking about " + input + ". As your AI financial assistant, I can provide insights on portfolio optimization, market analysis, risk management, and investment strategies. Could you be more specific about what aspect you'd like me to focus on?";
  };

  // AIML: generate suggested follow-ups from model output/metadata
  const getResponseSuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("portfolio")) {
      return ["Optimize allocation", "Tax loss harvesting", "Rebalancing strategy", "Performance metrics"];
    }
    
    if (lowerInput.includes("market")) {
      return ["Sector analysis", "Economic indicators", "Global markets", "Currency impact"];
    }
    
    return ["Portfolio review", "Market outlook", "Risk analysis", "Investment ideas"];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center aura-glow">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">AURA AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Real-time Financial Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-success/20 text-success border-success/30">Online</Badge>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className={message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}>
                  {message.type === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <Card className={`p-4 ${message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "aura-card"}`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </Card>
                
                {message.suggestions && message.type === "assistant" && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs h-7 hover:bg-primary/10 hover:border-primary/50"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-muted">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <Card className="aura-card p-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Analyze my portfolio performance")}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Portfolio Analysis
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("What are today's market trends?")}>
            <DollarSign className="w-4 h-4 mr-2" />
            Market Trends
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Assess my investment risk")}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Risk Assessment
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Suggest investment opportunities")}>
            <Lightbulb className="w-4 h-4 mr-2" />
            Investment Ideas
          </Button>
        </div>

        {/* Input */}
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask AURA about your portfolio, market trends, or investment strategies..."
              className="min-h-[48px] bg-muted/50 border-border focus:border-primary resize-none"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="h-12 w-12 aura-button-primary p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}