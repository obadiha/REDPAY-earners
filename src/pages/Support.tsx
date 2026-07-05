import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle,#290000,#000)] p-5 text-center text-foreground">
      <div className="mx-auto max-w-[450px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-left text-2xl text-white/70 hover:text-white w-full"
        >
          ←
        </button>

        <h1 className="mb-2 text-3xl font-bold">Support</h1>
        <p className="mb-5 text-muted-foreground">
          We're here to help! Choose your preferred support channel
        </p>

        {/* Telegram Card */}
        <div className="mb-5 rounded-[18px] bg-white/[0.07] p-6">
          <div className="mb-2.5 text-5xl">📨</div>
          <h2 className="mb-2 text-xl font-bold">Telegram</h2>
          <p className="mb-4 text-muted-foreground">Chat with us on Telegram</p>
          <a href="t.me/Matthewxx8230" target="_blank" rel="noopener noreferrer">
            <button className="w-full rounded-[10px] bg-[#2A66FF] px-4 py-3 text-lg font-medium text-white transition-opacity hover:opacity-80">
              Open Telegram
            </button>
          </a>
        </div>

        {/* WhatsApp Card */}
        <div className="mb-5 rounded-[18px] bg-white/[0.07] p-6">
          <div className="mb-2.5 text-5xl">💬</div>
          <h2 className="mb-2 text-xl font-bold">WhatsApp</h2>
          <p className="mb-4 text-muted-foreground">Message us on WhatsApp</p>
          <a href="https://wa.me/234815420hr6173" target="_blank" rel="noopener noreferrer">
            <button className="w-full rounded-[10px] bg-[#25D366] px-4 py-3 text-lg font-medium text-white transition-opacity hover:opacity-80">
              Open WhatsApp
            </button>
          </a>
        </div>

        {/* Email Card */}
        <div className="mb-5 rounded-[18px] bg-white/[0.07] p-6">
          <div className="mb-2.5 text-5xl">✉️</div>
          <h2 className="mb-2 text-xl font-bold">Email</h2>
          <p className="mb-4 text-muted-foreground">Send us an email</p>
          <a href="chiboy82300@gmail.com">
            <button className="w-full rounded-[10px] bg-primary px-4 py-3 text-lg font-medium text-white transition-opacity hover:opacity-80">
              Send Email
            </button>
          </a>
        </div>

        {/* Support Hours Card */}
        <div className="rounded-[18px] bg-white/[0.07] p-6">
          <h3 className="mb-2 text-lg font-bold">Support Hours</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            24/7 Support - We're here for you around the clock
            <br /><br />
            Average response time: Within a few hours via email, or instantly via Live Chat, WhatsApp, and Telegram.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Support;
