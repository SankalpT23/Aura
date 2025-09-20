import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  Smartphone,
  Plane,
  ShoppingCart,
  MoreHorizontal,
} from "lucide-react";

// BACKEND: fetch recent transactions from API (support pagination, filtering)
// AIML: enrich each transaction with anomaly scores, category, or risk flags
const transactions = [
  {
    id: "TXN_000176",
    type: "buy",
    activity: "AAPL Stock Purchase",
    amount: "$25,500",
    status: "Completed",
    date: "17 Sep, 2024 03:45 PM",
    icon: TrendingUp,
    color: "success",
  },
  {
    id: "TXN_000175",
    type: "sell",
    activity: "TSLA Position Close",
    amount: "$32,750",
    status: "Pending",
    date: "15 Sep, 2024 11:30 AM",
    icon: TrendingDown,
    color: "warning",
  },
  {
    id: "TXN_000174",
    type: "buy",
    activity: "Crypto Portfolio Rebalance",
    amount: "$40,200",
    status: "Completed",
    date: "15 Sep, 2024 12:00 PM",
    icon: TrendingUp,
    color: "success",
  },
  {
    id: "TXN_000173",
    type: "dividend",
    activity: "Dividend Payment",
    amount: "$15,900",
    status: "In Progress",
    date: "14 Sep, 2024 09:15 PM",
    icon: CreditCard,
    color: "primary",
  },
  {
    id: "TXN_000172",
    type: "buy",
    activity: "Bond Investment",
    amount: "$50,200",
    status: "Completed",
    date: "10 Sep, 2024 06:00 AM",
    icon: TrendingUp,
    color: "success",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge className="bg-success/20 text-success border-success/30">Completed</Badge>;
    case "Pending":
      return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
    case "In Progress":
      return <Badge className="bg-primary/20 text-primary border-primary/30">In Progress</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function RecentTransactions() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/5">
            <TableHead className="text-muted-foreground font-medium">Transaction ID</TableHead>
            <TableHead className="text-muted-foreground font-medium">Activity</TableHead>
            <TableHead className="text-muted-foreground font-medium">Amount</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-muted-foreground font-medium"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="border-border hover:bg-muted/5 transition-colors">
              <TableCell className="font-mono text-sm text-muted-foreground">
                {transaction.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${transaction.color}/20`}>
                    <transaction.icon className={`w-4 h-4 text-${transaction.color}`} />
                  </div>
                  <span className="font-medium text-foreground">{transaction.activity}</span>
                </div>
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                {transaction.amount}
              </TableCell>
              <TableCell>
                {getStatusBadge(transaction.status)}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {transaction.date}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}