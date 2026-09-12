export type CompareCollege = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementAvg: number;
};

const KEY = 'compareList';

export function getCompareList(): CompareCollege[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addToCompare(college: CompareCollege): boolean {
  const list = getCompareList();
  if (list.find((c) => c.id === college.id)) return false; // already added
  if (list.length >= 3) return false; // cap at 3
  const updated = [...list, college];
  localStorage.setItem(KEY, JSON.stringify(updated));
  return true;
}

export function removeFromCompare(id: string) {
  const updated = getCompareList().filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function isInCompare(id: string): boolean {
  return getCompareList().some((c) => c.id === id);
}