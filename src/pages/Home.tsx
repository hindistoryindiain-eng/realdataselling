import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import OperatorCard from "@/components/OperatorCard";
import StatCard from "@/components/StatCard";
import WifiAnimation from "@/components/WifiAnimation";
import { toast } from "sonner";

const operators = [
  { id: "jio", name: "Jio", color: "#0A2885", textColor: "#fff" },
  { id: "airtel", name: "Airtel", color: "#ED1C24", textColor: "#fff" },
  { id: "vi", name: "Vi", color: "#FFD800", textColor: "#000" },
  { id: "bsnl", name: "BSNL", color: "#00A651", textColor: "#fff" },
  { id: "wifi", name: "WiFi", color: "#6366F1", textColor: "#fff" },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [isSelling, setIsSelling] = useState(false);
  const [stats, setStats] = useState({
    speed: 0,
    dataSold: 0,
    earnings: parseFloat(localStorage.getItem("balance") || "0"),
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSelling && selectedOperator) {
      interval = setInterval(() => {
        const randomSpeed = (Math.random() * 2 + 0.5).toFixed(2);
        const dataIncrement = parseFloat(randomSpeed) / 10;
        const earningsIncrement = dataIncrement * 20; // ₹20 per MB

        setStats(prev => {
          const newEarnings = prev.earnings + earningsIncrement;
          localStorage.setItem("balance", newEarnings.toFixed(2));
          return {
            speed: parseFloat(randomSpeed),
            dataSold: prev.dataSold + dataIncrement,
            earnings: newEarnings,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSelling, selectedOperator]);

  const handleStartStop = () => {
    if (!selectedOperator) {
      toast.error("Please select an operator first!");
      return;
    }

    if (!isSelling) {
      setIsSelling(true);
      toast.success("Data selling started!", {
        description: "Your unused data is being monetized",
      });
    } else {
      setIsSelling(false);
      toast.info("Data selling stopped");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="gradient-primary px-6 pt-10 pb-6 rounded-b-[2rem] shadow-primary">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xl">📱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">Data Selling Pro</h1>
              <p className="text-primary-foreground/70 text-sm">₹20/MB</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigate("/wallet")}
            >
              <Wallet className="w-6 h-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Operator Selection */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 animate-fade-in">
          <span>📶</span> Select Your Operator
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {operators.slice(0, 3).map((op, index) => (
            <OperatorCard
              key={op.id}
              name={op.name}
              logo={
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: op.color, color: op.textColor }}
                >
                  {op.name.charAt(0)}
                </div>
              }
              selected={selectedOperator === op.id}
              onClick={() => setSelectedOperator(op.id)}
              delay={index * 100}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {operators.slice(3).map((op, index) => (
            <OperatorCard
              key={op.id}
              name={op.name}
              logo={
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: op.color, color: op.textColor }}
                >
                  {op.id === "wifi" ? "📡" : op.name.charAt(0)}
                </div>
              }
              selected={selectedOperator === op.id}
              onClick={() => setSelectedOperator(op.id)}
              delay={(index + 3) * 100}
            />
          ))}
        </div>
      </div>

      {/* Selling Status */}
      <div className="px-6 mt-8">
        <div className="bg-card rounded-2xl p-6 shadow-soft text-center animate-slide-up">
          <WifiAnimation isActive={isSelling} />
          
          <h3 className="text-xl font-bold text-foreground mt-4">
            {isSelling ? "Selling Active" : "Ready to Sell"}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {isSelling 
              ? "Your data is being monetized" 
              : "Select operator and start selling"
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <StatCard 
              label="Speed" 
              value={stats.speed.toFixed(2)} 
              unit="MB/s"
              animate={isSelling}
            />
            <StatCard 
              label="Data Sold" 
              value={stats.dataSold.toFixed(2)} 
              unit="MB"
              animate={isSelling}
            />
            <StatCard 
              label="Earnings" 
              value={`₹${stats.earnings.toFixed(2)}`}
              highlight
              animate={isSelling}
            />
          </div>

          {/* Start/Stop Button */}
          <Button
            variant={isSelling ? "destructive" : "hero"}
            size="xl"
            className="w-full mt-6"
            onClick={handleStartStop}
          >
            {isSelling ? "⏹ Stop Selling" : "▶ Start Selling"}
          </Button>
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 mt-6">
        <div className="bg-success/10 rounded-2xl p-4 border border-success/20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h4 className="font-semibold text-success mb-2">How it works?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Select your network operator</li>
            <li>• Click Start to begin selling your unused data</li>
            <li>• Earn ₹20 for every 1 MB of data sold</li>
            <li>• Withdraw earnings to your bank account anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
