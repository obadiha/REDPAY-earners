import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  const joinWhatsApp = () => {
    window.open("https://whatsapp.com/channel/0029Vb7KSzl1iUxWoS3D1w2Z", "_blank");
  };

  const joinTelegram = () => {
    window.open("https://t.me/+we_KRfLrFUxhOGQ0", "_blank");
  };

  return (
    <main className="min-h-screen bg-[#1a0000] p-5 text-foreground">
      <div className="mx-auto max-w-[450px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-2xl text-white/70 hover:text-white"
        >
          ←
        </button>

        <h1 className="mb-2 text-center text-3xl font-bold">Join Our Community</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Connect with other RedPay users and stay updated
        </p>

        {/* WhatsApp Card */}
        <div className="mb-6 rounded-[20px] border border-[#550000] bg-[#2a0000] p-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="h-11 w-11"
            />
          </div>
          <h2 className="mb-2.5 text-[22px] font-bold">WhatsApp Group</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Join our WhatsApp group for instant updates and community discussions.
          </p>
          <button
            onClick={joinWhatsApp}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-4 py-4 text-lg font-medium text-white transition-opacity hover:opacity-80"
          >
            💬 Join WhatsApp
          </button>
        </div>

        {/* Telegram Card */}
        <div className="rounded-[20px] border border-[#550000] bg-[#2a0000] p-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
              alt="Telegram"
              className="h-11 w-11"
            />
          </div>
          <h2 className="mb-2.5 text-[22px] font-bold">Telegram Channel</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Follow our Telegram channel for official announcements and news.
          </p>
          <button
            onClick={joinTelegram}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1A73E8] px-4 py-4 text-lg font-medium text-white transition-opacity hover:opacity-80"
          >
            ✈️ Join Telegram
          </button>
        </div>
      </div>
    </main>
  );
};

export default Community;
