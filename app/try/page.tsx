"use client";

import { useRef, useState, useCallback } from "react";

const STYLES = [
  { id: "ghibli", label: "Ghibli", hue: 0, saturate: 1.8, contrast: 1.1, brightness: 1.05 },
  { id: "shinkai", label: "Shinkai", hue: 200, saturate: 2.2, contrast: 1.15, brightness: 1.1 },
  { id: "shonen", label: "Shonen", hue: 20, saturate: 2.5, contrast: 1.3, brightness: 1.0 },
  { id: "cyberpunk", label: "Cyberpunk", hue: 270, saturate: 3.0, contrast: 1.4, brightness: 0.95 },
  { id: "pastel", label: "Pastel", hue: 330, saturate: 1.2, contrast: 0.9, brightness: 1.15 },
] as const;

type StyleId = (typeof STYLES)[number]["id"];

export default function TryPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleId>("ghibli");
  const [applied, setApplied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
      setApplied(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleFile(file);
    },
    [handleFile]
  );

  const style = STYLES.find((s) => s.id === selectedStyle)!;

  const svgFilterId = `anime-filter-${style.id}`;
  const cssFilter = `url(#${svgFilterId})`;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Hidden SVG filters */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {STYLES.map((s) => (
            <filter key={s.id} id={`anime-filter-${s.id}`} colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="hueRotate"
                values={String(s.hue)}
                result="hueRotated"
              />
              <feColorMatrix
                in="hueRotated"
                type="saturate"
                values={String(s.saturate)}
                result="saturated"
              />
              <feComponentTransfer in="saturated" result="contrasted">
                <feFuncR type="linear" slope={String(s.contrast)} intercept={String((1 - s.contrast) / 2)} />
                <feFuncG type="linear" slope={String(s.contrast)} intercept={String((1 - s.contrast) / 2)} />
                <feFuncB type="linear" slope={String(s.contrast)} intercept={String((1 - s.contrast) / 2)} />
              </feComponentTransfer>
              {/* Posterize: quantize to ~6 levels for anime flat-color look */}
              <feComponentTransfer in="contrasted">
                <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
                <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
                <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
              </feComponentTransfer>
            </filter>
          ))}
        </defs>
      </svg>

      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-pink-500" />
          Animeify
        </a>
        <a
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </a>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pb-24">
        <div className="pt-10 pb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Try the filter</h1>
          <p className="mt-2 text-neutral-500">
            Upload a photo, pick a style, see the anime magic instantly.
          </p>
        </div>

        {/* Upload zone */}
        {!imageSrc && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 py-20 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <span className="text-5xl">🖼️</span>
            <p className="text-base font-medium text-neutral-700">
              Drop a photo here or{" "}
              <span className="text-pink-600 underline underline-offset-2">browse</span>
            </p>
            <p className="text-xs text-neutral-400">JPEG, PNG, WEBP, HEIC</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>
        )}

        {/* Style picker */}
        {imageSrc && (
          <>
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedStyle(s.id);
                    setApplied(false);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    selectedStyle === s.id
                      ? "bg-pink-600 text-white"
                      : "border border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setImageSrc(null);
                  setApplied(false);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs text-neutral-500 hover:bg-neutral-50"
              >
                Change photo
              </button>
            </div>

            {/* Before / After */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Before */}
              <div className="overflow-hidden rounded-2xl border border-neutral-200">
                <div className="bg-neutral-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Before
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt="Original"
                  className="w-full object-cover"
                />
              </div>

              {/* After */}
              <div className="overflow-hidden rounded-2xl border border-pink-200">
                <div className="bg-pink-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-pink-600">
                  After — {style.label}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={`${style.label} anime filter`}
                  style={{ filter: cssFilter }}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Apply button */}
            {!applied ? (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setApplied(true)}
                  className="rounded-full bg-pink-600 px-8 py-3.5 font-medium text-white transition hover:bg-pink-700"
                >
                  Apply {style.label} style ✨
                </button>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-pink-200 bg-pink-50 p-6 text-center">
                <p className="text-base font-semibold text-pink-800">
                  That is what {style.label} would look like! 🎉
                </p>
                <p className="mt-1 text-sm text-pink-600">
                  The real AI model ships at launch — join the waitlist to be first.
                </p>
                <a
                  href="/#waitlist"
                  className="mt-4 inline-block rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  Get early access
                </a>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
