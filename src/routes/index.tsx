import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import silkBg from "@/assets/silk-bg.jpg";
import heartImg from "@/assets/heart.png";

const RECIPIENT_NAME = "Vernita Nasya Kalista";
const SENDER_NAME = "Aryaaa";
const WISH_MESSAGE =
  "Happy17th birthday to my faforite person in the whole wide world, Vernita Nasya Kalista welcome to your sweet seventeen, baby! jujur masih agak ga nyangka kamu udah di umur 17 sekarang, Time really files when i'm with you with you. rasanya baru kemarin kita sering ngobrolin hal hal random dan sekarang kamu udah resmi memasuki legal era. i just want to take a mmoment to tell you how truly grateful iam to have you in my lifi. being with you makes everything feel so much lighter and brighter. kamu tuh bukan cuma pacar buat aku , tapi juga my safe place, tempat aku pulang dan cerita tentang apa aja tanpa takut di judge. Thank you for always being you yang lucu, kadang tengil, tapi selalu berhasil bikin aku makin sayang tiap hari nya ";
const SURPRISE_MESSAGE =
  "A little something waits for you — a handwritten letter tucked inside your favorite book. Go find it. 💌";

// Foto kenangan akan dimuat otomatis dari folder `src/assets/kenangan`.
const MEMORY_PHOTO_DETAILS: { [key: string]: { caption: string; date?: string } } = {
  "foto1.jpeg": {
    caption: "Pacar ke-1 aku",
  },
  "foto2.jpeg": {
    caption: "Pacar ke-2 aku",
  },
  "foto3.jpeg": {
    caption: "Pacar ke-3 aku",
  },
  "foto4.jpeg": {
    caption: "Pacar ke-4 aku, pokonya pacar aku semuaa",
  },
};

const memoryImageModules = import.meta.glob("@/assets/kenangan/*", {
  eager: true,
  import: "default",
});

const MEMORY_PHOTOS = Object.entries(memoryImageModules).map(([path, src]) => {
  const fileName = path.split("/").pop()!;
  const details = MEMORY_PHOTO_DETAILS[fileName] || {
    caption: "Kenangan Indah",
    date: "Suatu Hari",
  };
  return {
    src: src as string,
    ...details,
  };
});

const LOVE_QUESTIONS: {
  emoji: string;
  question: string;
  options: string[];
  reply: string;
}[] = [
  {
    emoji: "🌙",
    question: "If you could relive one of our moments, which would it be?",
    options: ["Our first meeting", "That rainy night", "Laughing till we cried"],
    reply: "Whatever your answer, I'd relive it a thousand times, as long as it's with you.",
  },
  {
    emoji: "☕",
    question: "What does your perfect morning sound like?",
    options: ["Coffee & cuddles", "A walk together", "Sleeping in late"],
    reply: "Alright — I'll make it happen tomorrow. Just open your eyes.",
  },
  {
    emoji: "✨",
    question: "One word for how you feel today?",
    options: ["Happy", "Moved", "Loved"],
    reply: "That's exactly how I feel every time I see you.",
  },
  {
    emoji: "💌",
    question: "What short message do you most want to hear right now?",
    options: ["I love you", "You are my everything", "Thank you for being here"],
    reply: "All three are true. Always. Every day.",
  },
];

export const Route = createFileRoute("/")({
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

function ScrollRevealWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
}

function LoveCard({
  data,
  answer,
  onAnswer,
}: {
  data: { emoji: string; question: string; options: string[]; reply: string };
  answer: string | null;
  onAnswer: (a: string | null) => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-accent/40 bg-card p-8 shadow-lg"
    >
      <div className="absolute -right-6 -top-6 text-7xl opacity-10 transition duration-500 group-hover:scale-110 group-hover:opacity-20">
        {data.emoji}
      </div>
      <div className="relative">
        <span className="text-3xl">{data.emoji}</span>
        <h3 className="mt-3 font-serif text-2xl text-foreground">{data.question}</h3>
        <AnimatePresence mode="wait">
          {!answer ? (
            <motion.div
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {data.options.map((opt) => (
                <motion.button
                  key={opt}
                  whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAnswer(opt)}
                  className="rounded-full border border-accent/50 bg-background px-4 py-2 font-serif text-sm text-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="reply"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl bg-secondary/50 p-4"
            >
              <p className="font-script text-lg text-primary">"{answer}"</p>
              <p className="mt-2 font-serif text-base italic text-foreground/80">
                {data.reply}
              </p>
              <button
                onClick={() => onAnswer(null)}
                className="mt-3 font-script text-sm text-accent underline underline-offset-4 hover:text-primary"
              >
                change answer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function MemoryGallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="mt-16"
    >
      <div className="text-center">
        <p className="font-script text-2xl text-accent">
          a little gift for answering everything…
        </p>
        <h3 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
          Si cantikkkkkk
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Salah satu hadiah terindah dari tuhan buat akuuuu.
        </p>
      </div>
      <motion.div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MEMORY_PHOTOS.map((p, i) => (
          <motion.figure
            key={i}
            whileHover={{
              y: -8,
              rotate: 0,
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            className="group relative overflow-hidden rounded-3xl border border-accent/40 bg-card shadow-lg"
            style={{
              transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
            }}
          >
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
            <figcaption className="p-4 text-center">
              <p className="font-script text-xl text-primary">{p.caption}</p>
              <p className="mt-1 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                {p.date}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
      <p className="mt-8 text-center font-script text-lg text-accent">
        …masihhhhh banyak lagi kenangan yang aku simpan dari kamu.
      </p>
    </motion.div>
  );
}

function SecretMessageCard() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [evasions, setEvasions] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const voiceRef = useRef<HTMLAudioElement>(null);

  const runAway = () => {
    const c = containerRef.current;
    const b = btnRef.current;
    if (!c || !b) return;
    const cr = c.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const maxX = Math.max(40, cr.width / 2 - br.width - 20);
    const maxY = Math.max(40, cr.height / 2 - br.height - 20);
    setOffset({ x: (Math.random() * 2 - 1) * maxX, y: (Math.random() * 2 - 1) * maxY });
    setEvasions((n) => n + 1);
  };

  const togglePlay = () => {
    const audio = voiceRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = voiceRef.current;
    const onEnded = () => setIsPlaying(false);
    audio?.addEventListener('ended', onEnded);
    return () => audio?.removeEventListener('ended', onEnded);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[300px] overflow-hidden rounded-3xl border border-accent/40 bg-card p-12 text-center shadow-xl">
      <AnimatePresence mode="wait">
        {isRevealed ? (
          <motion.div key="player" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="font-script text-2xl text-accent">Listen closely...</p>
            <div className="mt-6 flex flex-col items-center gap-4">
              <audio ref={voiceRef} src="/pesan.mp3" />
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
                aria-label={isPlaying ? "Pause message" : "Play message"}
              >
                {isPlaying ? (
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                ) : (
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6V4z"/></svg>
                )}
              </motion.button>
              <p className="font-serif text-foreground">A secret message</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="proposal" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="font-script text-2xl text-accent">One last thing...</p>
            <h3 className="mt-2 font-serif text-4xl text-foreground">A secret message for you?</h3>
            <div className="relative mt-10 flex items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setIsRevealed(true)}
                className="rounded-full bg-primary px-10 py-4 font-serif text-lg text-primary-foreground shadow-lg shadow-primary/30"
              >
                Yes, please!
              </motion.button>
              <motion.button
                ref={btnRef}
                onMouseEnter={runAway} onFocus={runAway} onTouchStart={runAway} onClick={runAway}
                animate={{ x: offset.x, y: offset.y, scale: 1 - Math.min(evasions * 0.1, 0.6), opacity: Math.max(0.4, 1 - evasions * 0.1) }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-full border border-border bg-background px-8 py-4 font-serif text-lg text-muted-foreground"
              >
                No, thanks
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Index() {
  const backsoundRef = useRef<HTMLAudioElement>(null);
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => LOVE_QUESTIONS.map(() => null),
  );
  const allAnswered = answers.every((a) => a !== null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const audio = backsoundRef.current;
    if (audio) {
      audio.volume = 0.2;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const playOnFirstInteraction = () => {
            audio.play();
            document.removeEventListener("click", playOnFirstInteraction);
          };
          document.addEventListener("click", playOnFirstInteraction);
        });
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3300); // Match preloader animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <audio ref={backsoundRef} src="/backsound.mp3" loop />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="min-h-screen bg-background text-foreground"
      >
        <section className="relative isolate overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 animated-gradient-bg" />
            <div className="absolute inset-0 parallax-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
          </motion.div>
          <FloatingHearts count={20} />
          <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-script text-2xl text-primary/80 shimmer"
            >
              To my beloved,
            </motion.p>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-4 font-serif text-6xl font-bold leading-[1.05] tracking-tight text-foreground md:text-8xl"
            >
              Happy Birthday,
              <br />
              <span className="italic text-primary">{RECIPIENT_NAME}</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-8 max-w-xl font-serif text-lg italic text-muted-foreground md:text-xl"
            >
              A day the world got a little more luminous — the day it got you.
            </motion.p>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "4rem" }}
              transition={{ duration: 1, delay: 1.8 }}
              className="mt-14 w-px bg-gradient-to-b from-transparent via-accent to-transparent"
            />
          </div>
        </section>

        <ScrollRevealWrapper>
          <section className="relative px-6 py-24">
            <div className="mx-auto max-w-3xl rounded-3xl border border-accent/40 bg-card p-10 shadow-xl md:p-16">
              <div className="mb-6 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-accent" />
                <span className="font-script text-xl text-accent">
                  a wish from my heart
                </span>
                <span className="h-px w-12 bg-accent" />
              </div>
              <h2 className="text-center font-serif text-4xl text-foreground md:text-5xl">
                For You, on Your Day
              </h2>
              <p className="mt-8 whitespace-pre-line text-center font-serif text-lg leading-relaxed text-foreground/80 md:text-xl">
                {WISH_MESSAGE}
              </p>
              <div className="mt-12 text-right">
                <p className="font-script text-2xl text-accent">Forever yours,</p>
                <p className="mt-1 font-serif text-2xl italic text-foreground">{SENDER_NAME}</p>
              </div>
            </div>
          </section>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper>
          <section className="relative px-6 py-16">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <p className="font-script text-2xl text-accent">
                  a few questions for you…
                </p>
                <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
                  Touch each card
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Answer as you like — there are no wrong answers, only reasons to
                  smile.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {LOVE_QUESTIONS.map((q, i) => (
                  <LoveCard
                    key={i}
                    data={q}
                    answer={answers[i]}
                    onAnswer={(a) =>
                      setAnswers((prev) => prev.map((v, idx) => (idx === i ? a : v)))
                    }
                  />
                ))}
              </div>
              <AnimatePresence>{allAnswered && <MemoryGallery />}</AnimatePresence>
            </div>
          </section>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper>
          <section className="px-6 pb-32">
            <div className="mx-auto max-w-3xl">
              <SecretMessageCard />
            </div>
          </section>
        </ScrollRevealWrapper>
        
        <footer className="pb-10 text-center">
          <p className="font-script text-lg text-accent">— made with devotion —</p>
        </footer>
      </motion.main>
    </>
  );
}
