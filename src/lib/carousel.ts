/**
 * Infinite-carousel index maths.
 *
 * The tour carousel renders three consecutive copies of the list
 * `[cloneA][real][cloneB]`, each of length `n`. The logical index lives in the
 * middle (real) block `[n, 2n)`. After a step lands in a clone block, the position
 * is normalised back into the middle block by exactly one block width - a
 * pixel-identical, invisible jump - which is what makes both directions loop with
 * no beginning or end.
 */

/** Wrap a 3x-track index back into the middle real block `[n, 2n)`. */
export function normalizeIndex(index: number, n: number): number {
  if (n <= 0) return 0;
  if (index >= 2 * n) return index - n;
  if (index < n) return index + n;
  return index;
}

/** The real tour position (0..n-1) a track index currently represents. */
export function realIndex(index: number, n: number): number {
  if (n <= 0) return 0;
  return ((index % n) + n) % n;
}
