import { Group, Kbd, TextInput } from '@mantine/core';
import { useElementSize, useHotkeys, useOs } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { FC, useEffect, useRef, useState } from 'react';

const SearchBar: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const os = useOs();
  const { ref: shortcutRef, width: shortcutWidth } = useElementSize();

  // Avoid hydration mismatch errors due to the
  // OS being 'undetermined' during SSR by rendering without the shortcut
  // indicator on the server & client on the first render and then adding
  // it when rendering gets handed over to the client.
  const [showShortcutIndicator, setShowShortcutIndicator] =
    useState<boolean>(false);
  useEffect(() => setShowShortcutIndicator(true), []);

  const shortcutIndicator = (() => {
    if (os === 'macos')
      return (
        <>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </>
      );

    if (os === 'linux' || os === 'windows') {
      return (
        <>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </>
      );
    }

    return null;
  })();

  useHotkeys([['mod+K', () => inputRef.current?.focus()]]);

  return (
    <TextInput
      aria-label="Cari"
      placeholder="Cari..."
      icon={<IconSearch size={20} />}
      rightSection={
        <Group ref={shortcutRef} spacing={2}>
          {showShortcutIndicator && shortcutIndicator}
        </Group>
      }
      rightSectionProps={{ style: { justifyContent: 'end', paddingRight: 6 } }}
      rightSectionWidth={shortcutWidth + 8}
      type="search"
      spellCheck={false}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      ref={inputRef}
    />
  );
};

export default SearchBar;
