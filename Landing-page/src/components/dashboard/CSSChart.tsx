"use client";

export function CSSChart() {
  return (
    <div className="h-80 w-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto">
          <div className="w-8 h-8 bg-[var(--primary)] rounded-full"></div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Portfolio Performance</h3>
          <p className="text-sm text-muted-foreground">Chart visualization will be available soon</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Value:</span>
            <span className="font-medium">$2,847,392</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">YTD Return:</span>
            <span className="font-medium text-success">+12.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Best Month:</span>
            <span className="font-medium text-success">+8.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
