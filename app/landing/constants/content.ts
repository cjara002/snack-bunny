import {
  faBell,
  faCalendarCheck,
  faDroplet,
  faFaceSmile,
  faHandHoldingHeart,
  faHeart,
  faMoon,
  faShieldHeart,
  faShoePrints,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import type { BunnyMoodOption } from "../interface/BunnyMoodOption";
import type { PillarFeature } from "../interface/PillarFeature";
import type { Principle } from "../interface/Principle";

// Copy mirrors snackbunny-mobile (dashboard/logic/bunny-copy.ts and
// bunny-explainer/constants/explainer-points.ts). Keep the two in step.

export const BUNNY_NAME = "Mochi";

export const MOOD_OPTIONS: readonly BunnyMoodOption[] = [
  {
    id: "great",
    name: "Thriving",
    trigger: "A steady week of looking after yourself",
    label: `${BUNNY_NAME}'s thriving`,
    sub: "You've been showing up. Coat's never looked better.",
    image: { src: "/assets/bunny/great.png", width: 394, height: 633 },
    auraClassName: "bg-vitaThriving",
    dotClassName: "bg-vitaThriving",
  },
  {
    id: "good",
    name: "Doing okay",
    trigger: "Most days on track",
    label: `${BUNNY_NAME}'s doing okay`,
    sub: "Solid groove. A little more rest or water and you're golden.",
    image: { src: "/assets/bunny/good.png", width: 372, height: 631 },
    auraClassName: "bg-vitaOkay",
    dotClassName: "bg-vitaOkay",
  },
  {
    id: "okay",
    name: "A bit sleepy",
    trigger: "A quieter stretch",
    label: `${BUNNY_NAME}'s a bit sleepy`,
    sub: "Been a quiet stretch. Small steps wake the bunny back up.",
    image: { src: "/assets/bunny/okay.png", width: 352, height: 632 },
    auraClassName: "bg-vitaSluggish",
    dotClassName: "bg-vitaSluggish",
  },
  {
    id: "tired",
    name: "Tired",
    trigger: "A short night's sleep",
    label: "Short on sleep",
    sub: "A short night leaves it a little tired. A good one brightens its eyes again.",
    image: { src: "/assets/bunny/tired.png", width: 399, height: 626 },
    auraClassName: "bg-pillarSleep",
    dotClassName: "bg-pillarSleep",
  },
  {
    id: "exhausted",
    name: "Running low",
    trigger: "Short sleep after a quiet week",
    label: "Needs some rest",
    sub: "No guilt here. Some sleep and a glass of water go a long way.",
    image: { src: "/assets/bunny/exhausted.png", width: 397, height: 617 },
    auraClassName: "bg-textFaint",
    dotClassName: "bg-textFaint",
  },
];

export const PILLAR_FEATURES: readonly PillarFeature[] = [
  {
    id: "meals",
    title: "Meals",
    body: "Calories and macros at a glance. Logging counts as showing up, and eating less never earns extra credit.",
    icon: faUtensils,
    tone: "calories",
  },
  {
    id: "water",
    title: "Water",
    body: "Tap to add a glass. Drink through the day and your bunny stays fresh.",
    icon: faDroplet,
    tone: "water",
  },
  {
    id: "sleep",
    title: "Sleep",
    body: "Fills in from Apple Health each morning, or add it by hand. A good night keeps its eyes bright.",
    icon: faMoon,
    tone: "sleep",
  },
  {
    id: "mood",
    title: "Mood",
    body: "Check in with how you feel. On a rough day the bunny rests with you, with no pressure to hit your goals.",
    icon: faFaceSmile,
    tone: "mood",
  },
  {
    id: "steps",
    title: "Steps",
    body: "Read from Apple Health on iPhone. Moving gives your bunny a little extra pep, and it's never penalized without it.",
    icon: faShoePrints,
    tone: "steps",
  },
  {
    id: "reminders",
    title: "Reminders",
    body: "Gentle nudges at the times you choose. No spam, ever.",
    icon: faBell,
    tone: "brand",
  },
];

export const PRINCIPLES: readonly Principle[] = [
  {
    id: "weight",
    title: "Never your weight",
    body: "Your bunny never changes with your weight, size or BMI. It only shows how you're looking after yourself.",
    icon: faHeart,
  },
  {
    id: "consistency",
    title: "One off day won't set it back",
    body: "Its coat and glow follow your last 7 days, not just today. Days you skip count as neutral.",
    icon: faCalendarCheck,
  },
  {
    id: "rough-days",
    title: "Rough days are allowed",
    body: "Log a low mood and the app eases off. Your bunny takes it easy with you.",
    icon: faHandHoldingHeart,
  },
  {
    id: "guardrail",
    title: "Safe targets, gently flagged",
    body: "If a calorie target runs low, SnackBunny says so and points you to support. It never pushes you to eat less.",
    icon: faShieldHeart,
  },
];
