import { siteConfig } from "@/lib/siteConfig";
import { Countdown } from "@/components/Countdown";
import { makeGoogleCalendarLink } from "@/lib/reminder";
import { BigScreenModal } from "@/components/BigScreenModal";

export default function Home() {
  // ✅ Safe defaults to avoid "undefined" errors
  const movie = siteConfig.movie;

  const sections = siteConfig.sections ?? {
    aboutTitle: "About KING",
    aboutText: "Add about text in siteConfig.ts",
    theme1Title: "THE CROWN",
    theme1Text: "Add theme text in siteConfig.ts",
    theme2Title: "THE MISSION",
    theme2Text: "Add theme text in siteConfig.ts",
    castCrewTitle: "CAST & CREW",
  };

  const cast = siteConfig.cast ?? [];
  const crew = siteConfig.crew ?? {
    director: "Unknown",
    writers: [],
    producers: [],
    music: [],
  };

  const socials = siteConfig.socials ?? [];
  const footer = siteConfig.footer ?? {
    copyright: "© 2026 KING",
    disclaimer: "Fan-made site.",
  };

  // Release date: Dec 24, 2026 IST (basic reminder event)
  const reminderLink = makeGoogleCalendarLink({
    title: `KING — Release Day`,
    details: "Movie release reminder (fan-made countdown site).",
    startISO: "20261224T100000", // 10:00 AM
    endISO: "20261224T120000", // 12:00 PM
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <BigScreenModal />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 opacity-40 [background:linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.9))]" />

        <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-16 md:pt-16">
          {/* Top brand */}
          <div className="flex items-center justify-between">
            <div className="text-sm tracking-[0.5em] text-white/70">
              {movie.title}
            </div>
            <a
              className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/80 hover:bg-white/10"
              href="#watch"
            >
              WATCH
            </a>
          </div>

          {/* Headline */}
          <div className="mt-10 md:mt-16">
            <div className="text-xs tracking-[0.5em] text-white/70">
              {movie.taglineTop}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              {movie.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-white/75">{movie.subhead}</p>

            <div className="mt-6 flex items-center gap-3 text-xs tracking-[0.35em] text-white/70">
              <span>{movie.genre ?? "ACTION • THRILLER"}</span>
              <span className="opacity-40">•</span>
              <span>{movie.releaseDateDisplay}</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="mt-10">
            <div className="text-xs tracking-[0.5em] text-white/70">
              COUNTDOWN TO RELEASE
            </div>

            <div className="mt-4">
              <Countdown targetISO={movie.releaseDateISO} />
            </div>

            <div className="mt-4 text-xs tracking-[0.35em] text-white/70">
              {movie.statusLabel}
            </div>

            {/* CTAs */}
            <div id="watch" className="mt-6 flex flex-wrap gap-3">
              <a
                href={movie.ctaPrimary?.href ?? "#"}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                ▶ {movie.ctaPrimary?.label ?? "WATCH"}
              </a>

              <a
                href={reminderLink}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/90 hover:bg-white/10"
              >
                ADD REMINDER
              </a>
            </div>

            <div className="mt-8 text-xs tracking-[0.5em] text-white/70">
              NOW PLAYING
            </div>
            <div className="mt-2 text-sm text-white/80">{movie.nowPlaying}</div>

            <a
              href="#about"
              className="mt-10 inline-block text-xs tracking-[0.5em] text-white/60 hover:text-white"
            >
              SCROLL
            </a>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          {sections.aboutTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-white/75">{sections.aboutText}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card title={sections.theme1Title} text={sections.theme1Text} />
          <Card title={sections.theme2Title} text={sections.theme2Text} />
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            {sections.castCrewTitle}
          </h2>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {/* CAST */}
            <div>
              <h3 className="text-sm tracking-[0.35em] text-white/70">CAST</h3>

              {cast.length === 0 ? (
                <p className="mt-4 text-white/60 text-sm">
                  Add cast array in siteConfig.ts
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {cast.map((c: any) => (
                    <div
                      key={c.name}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-white/90">{c.name}</span>
                      <span className="text-xs tracking-[0.25em] text-white/60">
                        {c.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CREW */}
            <div>
              <h3 className="text-sm tracking-[0.35em] text-white/70">CREW</h3>
              <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <Row k="Director" v={crew.director} />
                <Row k="Writers" v={(crew.writers ?? []).join(", ")} />
                <Row k="Producers" v={(crew.producers ?? []).join(", ")} />
                <Row k="Music" v={(crew.music ?? []).join(", ")} />
              </div>
            </div>
          </div>
        </div>

        <a
          href="#"
          className="mt-14 inline-block text-xs tracking-[0.5em] text-white/60 hover:text-white"
        >
          ↑
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="text-sm tracking-[0.5em] text-white/70">
            {movie.title}
          </div>
          <div className="mt-4 text-sm text-white/70">{footer.copyright}</div>
          <div className="mt-2 text-sm text-white/55">{footer.disclaimer}</div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            {socials.map((s: any) => (
              <a
                key={s.label}
                className="text-white/70 hover:text-white"
                href={s.href ?? "#"}
                target="_blank"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm tracking-[0.35em] text-white/70">{title}</h3>
      <p className="mt-3 text-white/80">{text}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 py-3 last:border-b-0">
      <div className="text-xs tracking-[0.35em] text-white/60">{k}</div>
      <div className="text-white/90">{v}</div>
    </div>
  );
}
