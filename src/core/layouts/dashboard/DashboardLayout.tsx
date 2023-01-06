import { ColorSchemeToggle } from '@/core/components/color-scheme-toggle';
import { SearchBar } from '@/core/components/search-bar';
import { ShortcutContext } from '@/core/contexts/ShortcutContext';
import { AppShell } from '@mantine/core';
import { HotkeyItem, useHotkeys } from '@mantine/hooks';
import { FC, ReactNode, useRef } from 'react';
import { AppDrawer } from './app-drawer';
import { AppHeader } from './app-header';
import { drawerCategories } from './data';

export type DashboardLayoutProps = {
  children: ReactNode;
  onAdd?: () => void;
  onSearch?: (query: string) => void;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  onAdd,
  onSearch,
}: DashboardLayoutProps) => {
  const searchBarRef = useRef<HTMLInputElement>(null);

  const shortcuts = [
    [
      's',
      () => {
        if (searchBarRef.current == null) return;

        searchBarRef.current.focus();
        searchBarRef.current.select();
      },
    ],
    onAdd && ['a', () => onAdd()],
  ].filter(Boolean) as HotkeyItem[];

  useHotkeys(shortcuts);

  return (
    <ShortcutContext.Provider
      value={{ shortcuts: shortcuts.map((val) => val[0]) }}
    >
      <AppShell
        navbar={<AppDrawer categories={drawerCategories} />}
        header={
          <AppHeader
            side={
              <>
                <SearchBar ref={searchBarRef} onSearch={onSearch} />
                <ColorSchemeToggle size={36} p={8} />
              </>
            }
          />
        }
      >
        {children}
      </AppShell>
    </ShortcutContext.Provider>
  );
};

export default DashboardLayout;
