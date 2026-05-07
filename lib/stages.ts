export interface StageInfo {
  i: number;
  label: string;
  color: string;
}

export const STAGES: StageInfo[] = [
  { i: 0, label: 'Lean & clean',      color: '#7EC8A0' },
  { i: 1, label: 'A little nibble',   color: '#A8D5A2' },
  { i: 2, label: 'Snack detected',    color: '#E8C96A' },
  { i: 3, label: "Gettin' thick",     color: '#E8A94A' },
  { i: 4, label: 'Chonky boi',        color: '#E07A5F' },
  { i: 5, label: "Oh lawd he comin'", color: '#D1495B' },
];

export function stageFor(count: number): StageInfo {
  if (count <= 0)  return STAGES[0];
  if (count <= 2)  return STAGES[1];
  if (count <= 5)  return STAGES[2];
  if (count <= 9)  return STAGES[3];
  if (count <= 14) return STAGES[4];
  return STAGES[5];
}
