import { cn } from "@/lib/utils";

interface OperatorCardProps {
  name: string;
  logo: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  delay?: number;
}

const OperatorCard = ({ name, logo, selected, onClick, delay = 0 }: OperatorCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 animate-scale-in hover:scale-105 active:scale-95",
        selected 
          ? "border-primary bg-primary/10 shadow-primary" 
          : "border-border bg-card hover:border-primary/50"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-2 transition-all duration-300",
        selected ? "scale-110" : ""
      )}>
        {logo}
      </div>
      <span className={cn(
        "text-sm font-semibold transition-colors duration-300",
        selected ? "text-primary" : "text-foreground"
      )}>
        {name}
      </span>
    </button>
  );
};

export default OperatorCard;
