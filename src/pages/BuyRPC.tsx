import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BuyRPC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handlePaymentConfirm = () => {
    navigate("/payment-processing");
  };

  return (
    <main className="min-h-screen bg-[#0a0000] p-5 text-foreground">
      <div className="mx-auto w-[90%] max-w-[500px]">
        <h1 className="mb-1.5 text-center text-2xl font-bold">Payment Instructions</h1>
        <p className="mb-6 text-center text-muted-foreground">Transfer to the account below</p>

        {/* Amount */}
        <div className="mb-4 rounded-[10px] border border-primary/20 bg-[#1a0000] p-5">
          <div className="mb-1.5 text-sm text-muted-foreground">Amount to Pay</div>
          <div className="flex items-center justify-between rounded-lg bg-[#250000] p-4 text-lg font-bold">
            ₦8,500
            <button
              onClick={() => copyText("8,500")}
              className="rounded-md border border-primary bg-[#400000] px-3 py-2 text-sm transition-colors hover:bg-[#5a0000]"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Bank Name */}
        <div className="mb-4 rounded-[10px] border border-primary/20 bg-[#1a0000] p-5">
          <div className="mb-1.5 text-sm text-muted-foreground">Bank Name</div>
          <div className="flex items-center justify-between rounded-lg bg-[#250000] p-4 text-lg font-bold">
            Moniepoint MFB
            <button
              onClick={() => copyText("Moniepoint MFB")}
              className="rounded-md border border-primary bg-[#400000] px-3 py-2 text-sm transition-colors hover:bg-[#5a0000]"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Account Number */}
        <div className="mb-4 rounded-[10px] border border-primary/20 bg-[#1a0000] p-5">
          <div className="mb-1.5 text-sm text-muted-foreground">Account Number</div>
          <div className="flex items-center justify-between rounded-lg bg-[#250000] p-4 text-lg font-bold">
            6809618496
            <button
              onClick={() => copyText("6809618496")}
              className="rounded-md border border-primary bg-[#400000] px-3 py-2 text-sm transition-colors hover:bg-[#5a0000]"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Account Name */}
        <div className="mb-4 rounded-[10px] border border-primary/20 bg-[#1a0000] p-5">
          <div className="mb-1.5 text-sm text-muted-foreground">Account Name</div>
          <div className="flex items-center justify-between rounded-lg bg-[#250000] p-4 text-lg font-bold">
            Suleiman Shuaib
            <button
              onClick={() => copyText("Suleiman Shuaib")}
              className="rounded-md border border-primary bg-[#400000] px-3 py-2 text-sm transition-colors hover:bg-[#5a0000]"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Upload Screenshot */}
        <label htmlFor="upload" className="cursor-pointer">
          <div className="mt-2.5 rounded-[10px] border-2 border-dashed border-primary p-8 text-center transition-colors hover:bg-[#150000]">
            {uploadedFile ? (
              <span>Uploaded: <b>{uploadedFile}</b></span>
            ) : (
              <>
                <span className="text-2xl">⬆</span>
                <br /><br />
                Click to upload payment proof<br />
                <small className="text-muted-foreground">PNG, JPG up to 10MB</small>
              </>
            )}
          </div>
        </label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        <button
          onClick={handlePaymentConfirm}
          className="mt-5 w-full rounded-[10px] bg-primary p-4 text-lg font-bold transition-colors hover:bg-primary/80"
        >
          I Have Made Payment
        </button>
      </div>

      {/* Payment Notice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in duration-300">
          <div className="relative w-[90%] max-w-[500px] rounded-xl bg-[#111111] p-5 text-foreground animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-2.5 text-2xl text-muted-foreground hover:text-foreground"
            >
              ×
            </button>

            <div className="mb-5 flex items-center gap-2 text-xl font-bold">
              ⚠️ Important Payment Notice
            </div>

            <ul className="list-none space-y-4 text-[15px] leading-relaxed">
              <li>Transfer the <b>exact amount</b> shown on this page.</li>
              <li>Upload a clear <b>payment screenshot</b> immediately after transfer.</li>
              <li className="text-[#ff4444]">
                ⚠️ <b>Avoid using Opay bank.</b> Due to temporary network issues from Opay servers, payments made with Opay may not be confirmed. Please use <b>any other Nigerian bank</b> for instant confirmation.
              </li>
              <li className="text-[#87ff87]">
                ✔ Payments made with other banks are confirmed within minutes.
              </li>
              <li className="text-[#ff6666]">
                ❌ Do not dispute your payment under any circumstances — disputes delay confirmation.
              </li>
            </ul>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full rounded-lg bg-primary p-3.5 font-bold transition-colors hover:bg-primary/80"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default BuyRPC;
