import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { withdrawSchema } from "@/lib/validation";

const banks = [
  "Access Bank",
  "First Bank",
  "GTBank",
  "UBA",
  "Zenith Bank",
  "Fidelity Bank",
  "Union Bank",
  "Wema Bank",
  "Sterling Bank",
  "Polaris Bank",
  "Stanbic IBTC",
  "Ecobank",
  "FCMB",
  "Keystone Bank",
  "Unity Bank",
  "Heritage Bank",
  "Providus Bank",
  "Jaiz Bank",
  "Moniepoint MFB",
  "Kuda Bank",
  "Opay",
  "PalmPay",
];

const Withdraw = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [rpc, setRpc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const storedBalance = localStorage.getItem("rp_balance");
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const formatNaira = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const numAmount = parseFloat(amount) || 0;

    const result = withdrawSchema.safeParse({
      accountNumber,
      accountName,
      bank,
      amount: numAmount,
      rpc,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    if (rpc !== "RPC200420") {
      setErrors({ rpc: "Invalid RPC code" });
      toast.error("Invalid RPC code. Please purchase a valid RPC code.");
      return;
    }

    if (numAmount > balance) {
      setErrors({ amount: "Insufficient balance" });
      toast.error("Insufficient balance for this withdrawal");
      return;
    }

    setIsProcessing(true);

    timerRef.current = setTimeout(() => {
      const newBalance = balance - numAmount;
      localStorage.setItem("rp_balance", newBalance.toString());
      
      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      transactions.unshift({
        title: `Withdrawal to ${bank}`,
        amount: numAmount,
        type: "debit",
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem("transactions", JSON.stringify(transactions));
      
      navigate("/dashboard");
      toast.success("Withdrawal successful!");
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-background p-5 text-foreground">
      <div className="mx-auto max-w-[500px]">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-2xl text-foreground/70 hover:text-foreground"
          aria-label="Back to dashboard"
        >
          ←
        </button>

        <h1 className="mb-1.5 text-center text-2xl font-bold">Withdraw Funds</h1>
        <p className="mb-4 text-center text-muted-foreground">
          Enter your bank details below
        </p>

        <div className="mb-6 rounded-xl border border-primary/20 bg-card p-4 text-center">
          <div className="text-sm text-muted-foreground">Available Balance</div>
          <div className="text-2xl font-bold text-[#00ff00]">{formatNaira(balance)}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl border border-primary/20 bg-card p-4">
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Account Number
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setAccountNumber(value);
              }}
              placeholder="Enter 10-digit account number"
              maxLength={10}
              className={`w-full rounded-lg bg-secondary p-3 text-foreground placeholder:text-muted-foreground ${
                errors.accountNumber ? "border border-destructive" : ""
              }`}
            />
            {errors.accountNumber && (
              <p className="mt-1 text-xs text-destructive">{errors.accountNumber}</p>
            )}
          </div>

          <div className="rounded-xl border border-primary/20 bg-card p-4">
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Account Name
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter account name"
              maxLength={50}
              className={`w-full rounded-lg bg-secondary p-3 text-foreground placeholder:text-muted-foreground ${
                errors.accountName ? "border border-destructive" : ""
              }`}
            />
            {errors.accountName && (
              <p className="mt-1 text-xs text-destructive">{errors.accountName}</p>
            )}
          </div>

          <div className="rounded-xl border border-primary/20 bg-card p-4">
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Select Bank
            </label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className={`w-full rounded-lg bg-secondary p-3 text-foreground ${
                errors.bank ? "border border-destructive" : ""
              }`}
            >
              <option value="">Select a bank</option>
              {banks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.bank && (
              <p className="mt-1 text-xs text-destructive">{errors.bank}</p>
            )}
          </div>

          <div className="rounded-xl border border-primary/20 bg-card p-4">
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Amount (₦)
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max="10000000"
              className={`w-full rounded-lg bg-secondary p-3 text-foreground placeholder:text-muted-foreground ${
                errors.amount ? "border border-destructive" : ""
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-destructive">{errors.amount}</p>
            )}
          </div>

          <div className="rounded-xl border border-primary/20 bg-card p-4">
            <label className="mb-1.5 block text-sm text-muted-foreground">
              RPC Code
            </label>
            <input
              type="text"
              value={rpc}
              onChange={(e) => setRpc(e.target.value)}
              placeholder="Enter RPC code"
              maxLength={20}
              className={`w-full rounded-lg bg-secondary p-3 text-foreground placeholder:text-muted-foreground ${
                errors.rpc ? "border border-destructive" : ""
              }`}
            />
            {errors.rpc && (
              <p className="mt-1 text-xs text-destructive">{errors.rpc}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full rounded-xl bg-primary p-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Withdraw;
