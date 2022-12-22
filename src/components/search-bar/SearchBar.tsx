import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { FC, useCallback, useRef } from 'react';
import { AriaSearchFieldProps, useSearchField } from 'react-aria';
import { useSearchFieldState } from 'react-stately';
import { OS } from 'src/utils/getOS';

export type SearchBarProps = AriaSearchFieldProps & {
  className?: string;
  os?: OS;
};

const SearchBar: FC<SearchBarProps> = ({
  className,
  os,
  ...props
}: SearchBarProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const state = useSearchFieldState(props);
  const { inputProps } = useSearchField(
    {
      placeholder: 'Cari...',
      autoComplete: 'off',
      ...props,
    },
    state,
    ref
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (ref.current == null) return;

    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
      ref.current.focus();
      event.stopPropagation();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keyup', handleKeyPress);
  }, []);

  const shortcutIndicator = (() => {
    if (os === OS.macos) {
      return (
        <>
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">K</kbd>
        </>
      );
    }

    if (os === OS.windows || os === OS.linux) {
      return (
        <>
          <kbd className="kbd">Ctrl</kbd>
          <kbd className="kbd">K</kbd>
        </>
      );
    }

    return <></>;
  })();

  return (
    <div className={clsx('form-control relative', className)}>
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-2 top-[50%] h-5 w-5 translate-y-[-50%]"
      />

      <input
        ref={ref}
        className={clsx(
          'rounded-lg border-none bg-slate-50 pl-10 text-primary focus:ring-0 focus-visible:ring-0',
          (os === OS.windows || os === OS.macos || os === OS.linux) && 'pr-16'
        )}
        spellCheck={false}
        {...inputProps}
      />

      <div className="absolute right-2 top-[50%] flex translate-y-[-50%] gap-1 text-xs">
        {shortcutIndicator}
      </div>
    </div>
  );
};

export default SearchBar;
