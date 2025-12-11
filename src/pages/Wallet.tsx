import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Wallet as WalletIcon, CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type PaymentMethod = "upi" | "bank";

const Wallet = () => {
  const navigate = useNavigate();
  const [balance] = useState(parseFloat(localStorage.getItem("balance") || "0"));
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [bankDetails, setBankDetails] = useState({ account: "", ifsc: "" });
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) > balance) {
      toast.error("Insufficient balance");
      return;
    }
    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter UPI ID");
      return;
    }
    if (paymentMethod === "bank" && (!bankDetails.account || !bankDetails.ifsc)) {
      toast.error("Please enter bank details");
      return;
    }

    setIsProcessing(true);
    
    // Simulate instant payment
    setTimeout(() => {
      const newBalance = balance - parseFloat(amount);
      localStorage.setItem("balance", newBalance.toFixed(2));
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate("/home");
        toast.success("Withdrawal successful!", {
          description: `₹${amount} transferred to your account`,
        });
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center animate-success">
          <div className="w-32 h-32 rounded-full gradient-success flex items-center justify-center mx-auto shadow-success animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-success-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-6 animate-fade-in">Withdrawal Request Submitted!</h2>
          <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>₹{amount} withdrawal initiated</p>
          <p className="text-success font-semibold mt-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {paymentMethod === "upi" ? upiId : `A/C: ${bankDetails.account}`}
          </p>
          <div className="mt-4 p-3 bg-primary/10 rounded-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-primary font-medium text-sm">💰 Payment will be credited within 5-7 business days</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary px-6 pt-10 pb-6 rounded-b-[2rem] shadow-primary">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <WalletIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground">My Wallet</h1>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 -mt-4">
        <div className="gradient-success rounded-2xl p-6 shadow-success animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-success-foreground/80 text-sm">Available Balance</p>
              <h2 className="text-4xl font-bold text-success-foreground mt-1">
                ₹{balance.toFixed(2)}
              </h2>
            </div>
            <div className="w-14 h-14 bg-success-foreground/20 rounded-xl flex items-center justify-center">
              <WalletIcon className="w-8 h-8 text-success-foreground" />
            </div>
          </div>
          
          <Button
            variant="secondary"
            className="w-full mt-4 bg-success-foreground/20 text-success-foreground hover:bg-success-foreground/30 border-0"
            onClick={() => setShowWithdraw(!showWithdraw)}
          >
            Withdraw Funds
          </Button>
        </div>
      </div>

      {/* Withdraw Section */}
      {showWithdraw && (
        <div className="px-6 mt-6 animate-slide-up">
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Withdraw To</h3>
            
            {/* Payment Method Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setPaymentMethod("upi")}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300",
                  paymentMethod === "upi"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Smartphone className={cn(
                  "w-6 h-6",
                  paymentMethod === "upi" ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "font-medium",
                  paymentMethod === "upi" ? "text-primary" : "text-foreground"
                )}>UPI</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod("bank")}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300",
                  paymentMethod === "bank"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <CreditCard className={cn(
                  "w-6 h-6",
                  paymentMethod === "bank" ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "font-medium",
                  paymentMethod === "bank" ? "text-primary" : "text-foreground"
                )}>Bank</span>
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl font-bold"
              />
            </div>

            {/* UPI Input */}
            {paymentMethod === "upi" && (
              <div className="mb-4 animate-fade-in">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">UPI ID</label>
                <Input
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}

            {/* Bank Input */}
            {paymentMethod === "bank" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Account Number</label>
                  <Input
                    placeholder="Enter account number"
                    value={bankDetails.account}
                    onChange={(e) => setBankDetails({ ...bankDetails, account: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">IFSC Code</label>
                  <Input
                    placeholder="Enter IFSC code"
                    value={bankDetails.ifsc}
                    onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Withdraw Button */}
            <Button
              variant="hero"
              size="lg"
              className="w-full mt-6"
              onClick={handleWithdraw}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Withdraw Now"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Transaction History Placeholder */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Transaction History</h3>
        <div className="bg-card rounded-xl p-8 text-center shadow-soft">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
