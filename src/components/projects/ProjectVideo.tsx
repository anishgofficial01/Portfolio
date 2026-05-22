"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ProjectVideo as ProjectVideoData } from "@/data/project-media";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface ProjectVideoProps {
  video: ProjectVideoData;
  projectTitle: string;
  className?: string;
}

/**
 * Cinematic project demo video — click to play, pauses when off-screen.
 */
export function ProjectVideo({
  video,
  projectTitle,
  className,
}: ProjectVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const pause = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setIsPlaying(false);
  }, []);

  const play = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      await el.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else void play();
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) pause();
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [pause]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onEnded = (): void => setIsPlaying(false);
    const onPlay = (): void => setIsPlaying(true);
    const onPause = (): void => setIsPlaying(false);

    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "project-visual project-video relative aspect-[16/9] w-full overflow-hidden",
        "bg-[var(--color-bg-secondary)]",
        className
      )}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        src={video.src}
        poster={video.poster}
        playsInline
        muted={isMuted}
        loop
        preload="metadata"
        aria-label={`${projectTitle} — ${video.label}`}
      />

      {/* Top label */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[rgba(13,13,13,0.85)] to-transparent p-4 md:p-6">
        <span className="font-body text-label-editorial text-[var(--color-text-primary)]">
          {video.label}
        </span>
      </div>

      {/* Center play — shown when paused */}
      {!isPlaying && (
        <button
          type="button"
          onClick={() => void play()}
          className={cn(
            "absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
            "border border-[var(--color-border-strong)] bg-[rgba(13,13,13,0.65)] backdrop-blur-sm",
            "text-[var(--color-text-primary)] transition-all duration-500 ease-[var(--ease-premium)]",
            "hover:scale-105 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          )}
          aria-label={`Play ${projectTitle} demo`}
          data-cursor-hover
        >
          <Play size={22} className="ml-0.5" aria-hidden />
        </button>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={togglePlay}
          className={cn(
            "flex h-9 w-9 items-center justify-center",
            "border border-[var(--color-border)] bg-[rgba(13,13,13,0.65)] backdrop-blur-sm",
            "text-[var(--color-text-primary)] transition-colors duration-300",
            "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          data-cursor-hover
        >
          {isPlaying ? (
            <Pause size={16} aria-hidden />
          ) : (
            <Play size={16} aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className={cn(
            "flex h-9 w-9 items-center justify-center",
            "border border-[var(--color-border)] bg-[rgba(13,13,13,0.65)] backdrop-blur-sm",
            "text-[var(--color-text-primary)] transition-colors duration-300",
            "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          )}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          data-cursor-hover
        >
          {isMuted ? (
            <VolumeX size={16} aria-hidden />
          ) : (
            <Volume2 size={16} aria-hidden />
          )}
        </button>
      </div>

      {prefersReducedMotion && (
        <p className="sr-only">
          Video playback available. Use play control to start.
        </p>
      )}

      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-px bg-[var(--color-accent)] opacity-80"
        aria-hidden
      />
    </div>
  );
}
