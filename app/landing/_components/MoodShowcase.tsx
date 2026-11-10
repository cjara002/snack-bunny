"use client";

import { useCallback, useState, type MouseEvent } from "react";
import Image from "next/image";
import Card from "@/app/_components/ui/Card";
import SectionIntro from "./SectionIntro";
import { MOOD_OPTIONS } from "../constants/content";
import type { BunnyMoodOption } from "../interface/BunnyMoodOption";

const DEFAULT_MOOD: BunnyMoodOption["id"] = "great";

const findMood = (id: string | undefined) => MOOD_OPTIONS.find((mood) => mood.id === id);

const MoodShowcase = () => {
  const [selectedId, setSelectedId] = useState<BunnyMoodOption["id"]>(DEFAULT_MOOD);
  const selected = findMood(selectedId) ?? MOOD_OPTIONS[0];

  // One handler for every option; the id rides on data-mood.
  const handleSelect = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const mood = findMood(event.currentTarget.dataset.mood);
    if (mood) setSelectedId(mood.id);
  }, []);

  const renderBunny = (mood: BunnyMoodOption) => (
    <Image
      key={mood.id}
      src={mood.image.src}
      alt={mood.id === selectedId ? `${mood.name} bunny` : ""}
      width={mood.image.width}
      height={mood.image.height}
      className={`absolute inset-x-0 bottom-0 mx-auto h-full w-auto transition-opacity duration-250 ${
        mood.id === selectedId ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  const renderOption = (mood: BunnyMoodOption) => {
    const isSelected = mood.id === selectedId;
    return (
      <li key={mood.id}>
        <button
          type="button"
          data-mood={mood.id}
          onClick={handleSelect}
          aria-pressed={isSelected}
          className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 bg-secondary px-5 py-4 text-left transition-[border-color,box-shadow,transform] duration-200 ease-(--ease-bounce) active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            isSelected ? "border-primary shadow-warmMd" : "border-transparent shadow-warmSm hover:border-borderSoft"
          }`}
        >
          <span aria-hidden="true" className={`size-3 shrink-0 rounded-full ${mood.dotClassName}`} />
          <span className="min-w-0">
            <span className="block font-black text-textPrimary">{mood.name}</span>
            <span className="block text-sm font-semibold text-textMuted">{mood.trigger}</span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <section id="bunny" aria-labelledby="bunny-heading" className="scroll-mt-24 pb-16 pt-10 md:pb-24 md:pt-12">
      <SectionIntro
        id="bunny-heading"
        eyebrow="Meet your bunny"
        title="It shows how you've been looking after yourself."
        lede="Its face follows your sleep, water, meals and mood, measured against your own targets. Tap a mood to see it."
      />

      <div className="mt-12 grid items-center gap-8 md:grid-cols-2 md:gap-12">
        {/* Bunny stage */}
        <Card padding="lg" radius="xl" elevation="md" className="relative overflow-hidden text-center">
          <div className="relative mx-auto h-64 w-full md:h-72">
            <div
              aria-hidden="true"
              className={`absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl transition-colors duration-600 ${selected.auraClassName}`}
            />
            <div className="relative h-full animate-bunny-breathe">{MOOD_OPTIONS.map(renderBunny)}</div>
          </div>
          <div aria-live="polite">
            <p className="mt-6 text-2xl font-black text-textPrimary">{selected.label}</p>
            <p className="mx-auto mt-2 max-w-xs font-semibold text-textMuted">{selected.sub}</p>
          </div>
        </Card>

        {/* Picker. The 7-day rule lives in PrinciplesSection, not repeated here. */}
        <ul className="space-y-3">{MOOD_OPTIONS.map(renderOption)}</ul>
      </div>
    </section>
  );
};

export default MoodShowcase;
