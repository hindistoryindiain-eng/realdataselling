import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
  animate?: boolean;
}

const StatCard = ({ label, value, unit, highlight, animate }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-xl p-4 text-center shadow-soft transition-all duration-300",
      highlight && "bg-primary/5 border border-primary/20"
    )}>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <p className={cn(
        "text-xl font-bold transition-all duration-300",
        highlight ? "text-primary" : "text-foreground",
        animate && "animate-counting"
      )}>
        {value}
      </p>
      {unit && <p className="text-xs text-muted-foreground">{unit}</p>}
    </div>
  );
};

export default StatCard;
