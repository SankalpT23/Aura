import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg shadow-lg p-3">
      {label && (
        <p className="font-medium text-foreground mb-2">{label}</p>
      )}
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">
            {entry.name}: <span className="font-medium text-foreground">${entry.value.toLocaleString()}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

// BACKEND: replace mock time-series with user-specific portfolio values from API
// AIML: provide forecast series, confidence intervals, and anomaly bands
const mockData = [
  { time: "Jan", portfolio: 2400000, profit: 240000, loss: 40000 },
  { time: "Feb", portfolio: 2350000, profit: 280000, loss: 60000 },
  { time: "Mar", portfolio: 2420000, profit: 320000, loss: 45000 },
  { time: "Apr", portfolio: 2580000, profit: 380000, loss: 35000 },
  { time: "May", portfolio: 2650000, profit: 420000, loss: 55000 },
  { time: "Jun", portfolio: 2720000, profit: 450000, loss: 40000 },
  { time: "Jul", portfolio: 2800000, profit: 480000, loss: 30000 },
  { time: "Aug", portfolio: 2847392, profit: 510000, loss: 25000 },
];

export function SimplePortfolioChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockData}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(15 100% 60%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(15 100% 60%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="portfolio"
            stroke="hsl(15 100% 60%)"
            strokeWidth={3}
            fill="url(#portfolioGradient)"
            name="Portfolio Value"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}