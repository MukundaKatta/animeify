"use client";

import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
    } catch {
      // fire and forget
    }
  }

  return (
    <>
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-pink-500" />
          Animeify
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <a
            href="/try"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Try it
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-pink-100 via-pink-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-700">
            Consumer AI
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Turn any photo into anime.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            One tap. Six seconds. Ready to post. Studios Ghibli, Shinkai, shonen — pick your vibe.
          </p>
          {!submitted ? (
            <form
              id="waitlist"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <p className="mt-12 text-sm font-medium text-pink-700">
              Thanks. We will ping you the day we launch.
            </p>
          )}
          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl">
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-pink-300 to-purple-300" />
                <div className="absolute inset-0 flex items-center justify-center text-8xl">
                  👧
                </div>
                <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r-2 border-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-500" />
                  <div className="absolute inset-0 flex items-center justify-center text-8xl grayscale">
                    👧
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    Your selfie
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
                  Ghibli style
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button className="rounded-full bg-pink-600 px-4 py-1.5 text-xs font-medium text-white">
                  Ghibli
                </button>
                <button className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs hover:bg-neutral-50">
                  Shinkai
                </button>
                <button className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs hover:bg-neutral-50">
                  Shonen
                </button>
                <button className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs hover:bg-neutral-50">
                  Cyberpunk
                </button>
                <button className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs hover:bg-neutral-50">
                  Pastel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🎨</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Six signature styles</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                From Ghibli-soft to neon-cyberpunk. No prompt engineering required.
              </p>
            </div>
            <div>
              <div className="text-3xl">⚡</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Six seconds</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Upload, pick a style, share. No render queue, no waiting.
              </p>
            </div>
            <div>
              <div className="text-3xl">🛡️</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Faces stay yours</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                We never train on your photos. Your likeness is yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Upload your photo</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Any selfie, portrait, or group shot. JPEG, PNG, HEIC — we handle it all.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Pick your vibe</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Ghibli, Shinkai, shonen, cyberpunk, pastel — tap once and watch the magic.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Share it</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Download or share directly to Instagram, X, or wherever your people are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-pink-600 px-7 py-3.5 font-medium text-white transition hover:bg-pink-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
            Animeify
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
