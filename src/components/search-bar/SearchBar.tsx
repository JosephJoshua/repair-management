import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { FC, useCallback, useRef } from 'react';
import { OS } from 'src/utils/getOS';

export type SearchBarProps = {
  className?: string;
  os?: OS;
};

const SearchBar: FC<SearchBarProps> = ({ className, os }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (inputRef.current == null) return;

    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
      inputRef.current.focus();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keyup', handleKeyPress);
  }, []);

  return (
    <div className={`form-control relative ${className}`}>
      <MagnifyingGlassIcon className="w-5 h-5 absolute left-2 top-[50%] translate-y-[-50%]" />

      <input
        ref={inputRef}
        type="search"
        className="input input-sm pl-9 text-base-content placeholder:text-base-content"
        spellCheck={false}
        autoComplete="false"
        placeholder="Cari..."
      ></input>

      <div className="flex absolute right-2 text-xs top-[50%] translate-y-[-50%] gap-1">
        {os === OS.macos ? (
          <>
            <kbd className="kbd">⌘</kbd>
            <kbd className="kbd">K</kbd>
          </>
        ) : os === OS.windows || os === OS.linux ? (
          <>
            <kbd className="kbd">Ctrl</kbd>
            <kbd className="kbd">K</kbd>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
