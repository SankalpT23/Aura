import { useMemo } from "react";

interface DataPoint {
  time: string;
  portfolio: number;
}

// BACKEND: replace mock data with portfolio history fetched from backend
// AIML: add markers for predicted drawdowns or regime shifts
const mockData: DataPoint[] = [
  { time: "Jan", portfolio: 2400000 },
  { time: "Feb", portfolio: 2350000 },
  { time: "Mar", portfolio: 2420000 },
  { time: "Apr", portfolio: 2580000 },
  { time: "May", portfolio: 2650000 },
  { time: "Jun", portfolio: 2720000 },
  { time: "Jul", portfolio: 2800000 },
  { time: "Aug", portfolio: 2847392 },
];

export function CSSChart() {
  const maxValue = useMemo(() => Math.max(...mockData.map(d => d.portfolio)), []);
  const minValue = useMemo(() => Math.min(...mockData.map(d => d.portfolio)), []);
  const range = maxValue - minValue;

  const getHeight = (value: number) => {
    const percentage = ((value - minValue) / range) * 70 + 20; // 20-90% height
    return `${percentage}%`;
  };

  return (
    <div className="h-80 w-full p-4">
      <div className="h-full flex items-end justify-between gap-2">
        {mockData.map((point, index) => (
          <div key={point.time} className="flex flex-col items-center flex-1 h-full">
            <div className="flex-1 flex flex-col justify-end w-full">
              <div
                className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t-sm opacity-80 hover:opacity-100 transition-all duration-300 relative group"
                style={{ height: getHeight(point.portfolio) }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-card text-card-foreground text-xs rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  ${(point.portfolio / 1000000).toFixed(2)}M
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground font-medium">
              {point.time}
            </div>
          </div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute left-0 top-4 bottom-12 flex flex-col justify-between text-xs text-muted-foreground">
        <span>${(maxValue / 1000000).toFixed(1)}M</span>
        <span>${((maxValue + minValue) / 2 / 1000000).toFixed(1)}M</span>
        <span>${(minValue / 1000000).toFixed(1)}M</span>
      </div>
    </div>
  );
}