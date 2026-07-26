import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import silkBg from "@/assets/silk-bg.jpg";
import heartImg from "@/assets/heart.png";

const RECIPIENT_NAME = "My Love";
const SENDER_NAME = "Alex";
const WISH_MESSAGE =
  "From the moment our worlds touched, every ordinary day has been quietly rewritten. Today the universe pauses to celebrate the soul that made mine feel finally at home. May this year bring you slow mornings and loud laughter, quiet victories and the kind of joy that lingers in your smile long after the reason has passed. Thank you for being the most beautiful chapter of my life.";
const SURPRISE_MESSAGE =
  "A little something waits for you — a handwritten letter tucked inside your favorite book. Go find it. 💌";
const DATE_LINE = "Tonight, 8pm — our spot by the water. Wear the dress I love.";

// Kartu pertanyaan romantis — edit bebas. Setiap kartu punya pertanyaan,
// pilihan jawaban, dan pesan manis yang muncul setelah dijawab.
const LOVE_QUESTIONS: {
  emoji: string;
  question: string;
  options: string[];
  reply: string;
}[] = [
  {
    emoji: "🌙",
    question: "Kalau bisa mengulang satu momen kita, kamu pilih yang mana?",
    options: ["Pertama kali ketemu", "Malam hujan itu", "Tertawa sampai nangis"],
    reply: "Apapun jawabanmu, aku mau mengulanginya seribu kali — asal bersamamu.",
  },
  {
    emoji: "☕",
    question: "Pagi sempurna versimu terdengar seperti apa?",
    options: ["Kopi & pelukan", "Jalan pagi berdua", "Tidur sampai siang"],
    reply: "Baiklah — besok pagi aku wujudkan. Kamu tinggal buka mata saja.",
  },
  {
    emoji: "✨",
    question: "Satu kata untuk perasaanmu hari ini?",
    options: ["Bahagia", "Terharu", "Dicintai"],
    reply: "Itu juga yang aku rasakan setiap kali melihatmu.",
  },
  {
    emoji: "💌",
    question: "Pesan singkat apa yang paling ingin kamu dengar sekarang?",
    options: ["Aku sayang kamu", "Kamu segalanya", "Terima kasih sudah ada"],
    reply: "Ketiganya benar. Selalu benar. Setiap hari.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${RECIPIENT_NAME} — from ${SENDER_NAME}` },
      {
        name: "description",
        content: `A luminous, hand-crafted birthday greeting for ${RECIPIENT_NAME} — with love, from ${SENDER_NAME}.`,
      },
      { property: "og:title", content: `Happy Birthday, ${RECIPIENT_NAME}` },
      {
        property: "og:description",
        content: `An interactive birthday wish crafted with devotion, from ${SENDER_NAME}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 14 + Math.random() * 28,
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <img
          key={i}
          src={heartImg}
          alt=""
          aria-hidden
          className="float-heart absolute bottom-[-60px]"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDelay: `-${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function DateProposal() {
  const [accepted, setAccepted] = useState(false);
  const [evasions, setEvasions] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const runAway = () => {
    const c = containerRef.current;
    const b = btnRef.current;
    if (!c || !b) return;
    const cr = c.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const maxX = Math.max(40, cr.width / 2 - br.width - 20);
    const maxY = Math.max(40, cr.height / 2 - br.height - 20);
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;
    setOffset({ x, y });
    setEvasions((n) => n + 1);
  };

  if (accepted) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-card p-12 text-center shadow-xl animate-scale-in">
        <FloatingHearts count={12} />
        <p className="font-script text-3xl text-primary">It's a date 💕</p>
        <h3 className="mt-4 font-serif text-4xl text-foreground">You said yes.</h3>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">{DATE_LINE}</p>
        <p className="mt-8 font-script text-xl text-accent">I'll be counting the hours.</p>
      </div>
    );
  }

  const shrink = Math.min(evasions * 0.08, 0.5);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[360px] overflow-hidden rounded-3xl border border-accent/40 bg-card p-12 text-center shadow-xl"
    >
      <p className="font-script text-2xl text-accent">and one more thing…</p>
      <h3 className="mt-2 font-serif text-4xl md:text-5xl text-foreground">
        Will you be my date tonight?
      </h3>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        Say yes. (The other button is a little shy.)
      </p>
      <div className="relative mt-10 flex items-center justify-center gap-6">
        <button
          onClick={() => setAccepted(true)}
          className="rounded-full bg-primary px-10 py-4 font-serif text-lg text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-105 hover:shadow-primary/50"
        >
          Yes, always
        </button>
        <button
          ref={btnRef}
          onMouseEnter={runAway}
          onFocus={runAway}
          onTouchStart={runAway}
          onClick={runAway}
          className="rounded-full border border-border bg-background px-8 py-4 font-serif text-lg text-muted-foreground transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${1 - shrink})`,
            opacity: Math.max(0.4, 1 - evasions * 0.08),
          }}
        >
          No
        </button>
      </div>
      {evasions > 2 && (
        <p className="mt-8 font-script text-lg text-primary/70 animate-fade-in">
          see? even the button knows the answer.
        </p>
      )}
    </div>
  );
}

function Index() {
  const [revealed, setRevealed] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={silkBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        <FloatingHearts count={20} />
        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="font-script text-2xl text-primary/80 shimmer">To my beloved,</p>
          <h1 className="mt-4 font-serif text-6xl leading-[1.05] tracking-tight text-foreground md:text-8xl">
            Happy Birthday,
            <br />
            <span className="italic text-primary">{RECIPIENT_NAME}</span>
          </h1>
          <p className="mt-8 max-w-xl font-serif text-lg italic text-muted-foreground md:text-xl">
            A day the world got a little more luminous — the day it got you.
          </p>
          <div className="mt-14 h-16 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
        </div>
      </section>

      {/* Wish */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-accent/40 bg-card p-10 shadow-xl md:p-16">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-accent" />
            <span className="font-script text-xl text-accent">a wish from my heart</span>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-center font-serif text-4xl text-foreground md:text-5xl">
            For You, on Your Day
          </h2>
          <p className="mt-8 whitespace-pre-line text-center font-serif text-lg leading-relaxed text-foreground/80 md:text-xl">
            {WISH_MESSAGE}
          </p>

          <div className="mt-10 flex flex-col items-center">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="rounded-full bg-primary px-8 py-3 font-serif text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-105"
              >
                Reveal your surprise
              </button>
            ) : (
              <div className="relative w-full overflow-hidden rounded-2xl border border-accent/50 bg-secondary/40 p-8 text-center animate-scale-in">
                <FloatingHearts count={8} />
                <p className="font-script text-3xl text-primary">a little secret 🎁</p>
                <p className="mx-auto mt-4 max-w-lg font-serif text-lg text-foreground/80">
                  {SURPRISE_MESSAGE}
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-right">
            <p className="font-script text-2xl text-accent">Forever yours,</p>
            <p className="mt-1 font-serif text-2xl italic text-foreground">{SENDER_NAME}</p>
          </div>
        </div>
      </section>

      {/* Kartu pertanyaan romantis */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-script text-2xl text-accent">sedikit pertanyaan untukmu…</p>
            <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
              Sentuh setiap kartu
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Jawab sesukamu — tak ada jawaban salah, hanya alasan untuk tersenyum.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {LOVE_QUESTIONS.map((q, i) => (
              <LoveCard key={i} data={q} />
            ))}
          </div>
        </div>
      </section>

      {/* Date proposal */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <DateProposal />
        </div>
      </section>

      <footer className="pb-10 text-center">
        <p className="font-script text-lg text-accent">— made with devotion —</p>
      </footer>
    </main>
  );
}
