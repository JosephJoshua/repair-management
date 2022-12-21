import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className={`form-control relative ${className || ''}`}>
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-2 top-[50%] h-5 w-5 translate-y-[-50%]"
      />

      <input
        ref={inputRef}
        type="search"
        className={`rounded-lg border-none bg-slate-50 pl-10 text-primary focus:ring-0 focus-visible:ring-0 ${
          os === OS.macos || os === OS.windows || os === OS.linux ? 'pr-16' : ''
        }`}
        spellCheck={false}
        autoComplete="false"
        placeholder="Cari..."
      ></input>

      <div className="absolute right-2 top-[50%] flex translate-y-[-50%] gap-1 text-xs">
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
