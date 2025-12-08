import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, User, Lock, ArrowRight } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(formData));
      localStorage.setItem("balance", "0");
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-primary px-6 pt-12 pb-20 rounded-b-[3rem] shadow-primary">
        <div className="animate-fade-in">
          <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <Smartphone className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground text-center">
            Data Selling Pro
          </h1>
          <p className="text-primary-foreground/80 text-center mt-2">
            Earn ₹20 for every 1MB sold
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 -mt-10">
        <div className="bg-card rounded-2xl shadow-soft p-6 animate-slide-up">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-12"
                required
              />
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-12"
                required
              />
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-12"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full animate-fade-in" 
              size="lg"
              disabled={isLoading}
              style={{ animationDelay: "0.4s" }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Get Started <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            By signing up, you agree to our Terms & Conditions
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          {[
            { icon: "📱", label: "Easy Setup" },
            { icon: "💰", label: "Instant Earn" },
            { icon: "🏦", label: "Quick Withdraw" },
          ].map((feature, index) => (
            <div 
              key={feature.label}
              className="bg-card rounded-xl p-4 text-center shadow-soft hover:scale-105 transition-transform duration-300"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <p className="text-xs font-medium text-muted-foreground">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
