import { Kbd, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import React, { FormEventHandler, ForwardedRef } from 'react';

export type SearchBarProps = {
  onSearch?: (query: string) => void;
};

const SearchBar = (
  { onSearch }: SearchBarProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [query, setQuery] = useInputState<string>('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    // Wrap in a form to support the enter/search button on mobile devices (esp. Android).
    <form onSubmit={handleSubmit}>
      <TextInput
        aria-label="Cari"
        placeholder="Cari..."
        icon={<IconSearch size={20} />}
        rightSection={<Kbd>S</Kbd>}
        rightSectionProps={{
          style: { justifyContent: 'end', paddingRight: 6 },
        }}
        type="search"
        spellCheck={false}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        ref={ref}
        value={query}
        onChange={setQuery}
      />

      <input type="submit" hidden aria-hidden />
    </form>
  );
};

export default React.forwardRef(SearchBar);
