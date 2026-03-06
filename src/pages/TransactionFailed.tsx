import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TransactionFailed = () => {
  const navigate = useNavigate();

  const handleContactSupport = () => {
    window.open("https://t.me/Redpayagent1", "_blank", "noopener,noreferrer");
    toast.info("Opening support chat...");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle,hsl(0_100%_9%),hsl(0_100%_2%))] flex items-center justify-center p-5 text-foreground">
      <div className="w-[90%] max-w-[400px] rounded-[18px] border border-primary/20 bg-card/70 p-8 text-center shadow-[0_0_20px_rgba(255,0,0,0.3)]">
        {/* Error Circle */}
        <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full border-8 border-destructive/40 bg-destructive">
          <span className="text-5xl font-bold text-destructive-foreground">✕</span>
        </div>

        <h2 className="mt-5 text-[23px] font-bold text-destructive">
          Transaction verification failed!
        </h2>

        <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/80">
          Your payment could not be completed. Reason: No payment received from you/invalid payment method. If you have made the payment kindly send payment proof to our support team below.
        </p>

        {/* Reason Box */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/[0.13] px-5 py-4 text-primary/70">
          <span className="text-base">Invalid Payment</span>
          <span className="text-[22px] text-destructive">✕</span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-[18px] w-full rounded-[14px] bg-secondary p-4 text-base font-bold text-foreground transition-colors hover:bg-secondary/80"
        >
          Go to Dashboard
        </button>

        <button
          onClick={handleContactSupport}
          className="mt-[18px] flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#1298ff] p-4 text-[17px] font-bold text-white transition-colors hover:bg-[#1298ff]/80"
        >
          ✈ Contact Support
        </button>
      </div>
    </main>
  );
};

export default TransactionFailed;
