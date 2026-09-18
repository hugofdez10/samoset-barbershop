"use client";

import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Music2,
  Volume2,
  VolumeX,
} from "lucide-react";

const showcaseVideos = [
  {
    src: "/videos/samoset-showcase.mp4?v=reggaeton-compressed",
    poster: "/videos/showcase-poster.jpg",
    label: "Finished haircut showcase at Samoset Barbershop",
  },
  {
    src: "/videos/samoset-showcase-2.mp4?v=original-audio",
    poster: "/videos/showcase-poster-2.jpg",
    label: "Second finished haircut showcase at Samoset Barbershop",
  },
];

export function ShowcaseVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentVideo = showcaseVideos[currentIndex];

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (video.paused) {
      await video.play().catch(() => undefined);
    }
  }

  function showVideo(index: number) {
    const nextIndex =
      (index + showcaseVideos.length) % showcaseVideos.length;
    setCurrentIndex(nextIndex);
  }

  return (
    <div className="relative mx-auto w-full max-w-[23rem]">
      <div className="absolute -inset-6 rounded-[3rem] bg-[#b62425]/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-black p-2 shadow-2xl shadow-black/60">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.8rem] bg-[#111]">
          <video
            key={currentVideo.src}
            ref={videoRef}
            src={currentVideo.src}
            poster={currentVideo.poster}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            aria-label={currentVideo.label}
            onCanPlay={(event) => {
              event.currentTarget.muted = muted;
              void event.currentTarget.play().catch(() => undefined);
            }}
          />

          <div
            aria-live="polite"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md"
          >
            {currentIndex + 1} / {showcaseVideos.length}
          </div>

          <button
            type="button"
            onClick={() => showVideo(currentIndex - 1)}
            aria-label="Previous haircut video"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/80"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => showVideo(currentIndex + 1)}
            aria-label="Next haircut video"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/80"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-black/80"
          >
            {muted ? (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            )}
            {muted ? "Play music" : "Sound on"}
          </button>
        </div>
      </div>

      <div className="relative mx-auto -mt-4 flex w-[calc(100%-3rem)] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-xs font-bold text-white/55 shadow-xl">
        <Music2 className="h-4 w-4 text-[#d4ad63]" aria-hidden="true" />
        Two fresh cuts · Turn the music on
      </div>
    </div>
  );
}
