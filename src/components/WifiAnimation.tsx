import { cn } from "@/lib/utils";

interface WifiAnimationProps {
  isActive: boolean;
}

const WifiAnimation = ({ isActive }: WifiAnimationProps) => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Pulse rings */}
      {isActive && (
        <>
          <div className="absolute inset-0 rounded-full bg-success/20 animate-wave" />
          <div className="absolute inset-4 rounded-full bg-success/30 animate-wave" style={{ animationDelay: "0.5s" }} />
          <div className="absolute inset-8 rounded-full bg-success/40 animate-wave" style={{ animationDelay: "1s" }} />
        </>
      )}
      
      {/* Main circle */}
      <div className={cn(
        "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
        isActive 
          ? "gradient-success shadow-success" 
          : "bg-muted"
      )}>
        {/* Wifi icon */}
        <svg 
          viewBox="0 0 24 24" 
          className={cn(
            "w-12 h-12 transition-colors duration-300",
            isActive ? "text-success-foreground" : "text-muted-foreground"
          )}
          fill="currentColor"
        >
          <path d="M12 21l-1.5-1.5c-2.8-2.8-4.5-4.5-4.5-6.5 0-1.4.5-2.7 1.5-3.6l4.5-4.5 4.5 4.5c1 1 1.5 2.2 1.5 3.6 0 2-1.7 3.7-4.5 6.5L12 21z" />
          <path d="M12 3C7.03 3 3 7.03 3 12c0 2.21.81 4.24 2.16 5.8l1.42-1.42C5.59 15.12 5 13.62 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7c0 1.62-.59 3.12-1.58 4.38l1.42 1.42C20.19 16.24 21 14.21 21 12c0-4.97-4.03-9-9-9z" opacity={isActive ? 1 : 0.3} />
          <path d="M12 7c-2.76 0-5 2.24-5 5 0 1.18.41 2.26 1.09 3.12l1.42-1.42C9.19 13.26 9 12.66 9 12c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .66-.19 1.26-.51 1.7l1.42 1.42C16.59 14.26 17 13.18 17 12c0-2.76-2.24-5-5-5z" opacity={isActive ? 1 : 0.5} />
        </svg>
      </div>
    </div>
  );
};

export default WifiAnimation;
