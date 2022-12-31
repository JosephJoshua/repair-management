import React, { useContext } from 'react';

export type ShortcutContextProps = {
  /**
   * List of all **implemented** shortcuts.
   */
  shortcuts: string[];
};

export const ShortcutContext = React.createContext<
  ShortcutContextProps | undefined
>(undefined);

export const useShortcutContext = () => {
  const ctx = useContext(ShortcutContext);

  if (ctx === undefined)
    throw new Error('Missing provider for `useShortcutContext`');

  return ctx;
};
