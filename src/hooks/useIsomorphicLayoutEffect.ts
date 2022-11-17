import { useEffect, useLayoutEffect } from 'react';

// Only run `useLayoutEffect` if the hook is being ran on the client,
// otherwise fallback to `useEffect`.
// Use instead of `useLayoutEffect`!
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
