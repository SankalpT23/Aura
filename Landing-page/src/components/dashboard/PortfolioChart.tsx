import { SimplePortfolioChart } from "./SimpleChart";
import { CSSChart } from "./CSSChart";

// Use CSS chart as fallback if recharts has issues
export function PortfolioChart() {
  try {
    // BACKEND: source data via props/context fetched from API instead of inline mocks
    // AIML: toggle to switch between actuals vs model predictions
    return <SimplePortfolioChart />;
  } catch (error) {
    console.log("Recharts unavailable, using CSS chart");
    // BACKEND: same data interface should power this fallback too
    return <CSSChart />;
  }
}
