export interface BunnyMoodOption {
  id: "great" | "good" | "okay" | "tired" | "exhausted";
  /** Short name on the picker, e.g. "Thriving". */
  name: string;
  /** What leads to this mood, shown under the name. */
  trigger: string;
  /** Status headline under the bunny, as the app shows it. */
  label: string;
  sub: string;
  image: { src: string; width: number; height: number };
  /** Background class for the glow behind the bunny. */
  auraClassName: string;
  /** Background class for the picker's dot. */
  dotClassName: string;
}
