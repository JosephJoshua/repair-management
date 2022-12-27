import { AppDrawer } from '@/components/app-drawer';
import { AppHeader } from '@/components/app-header';
import { ColorSchemeToggle } from '@/components/color-scheme-toggle';
import { SearchBar } from '@/components/search-bar';
import { AppShell } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { drawerCategories } from './data';

export type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => {
  return (
    <AppShell
      navbar={<AppDrawer categories={drawerCategories} />}
      header={
        <AppHeader
          side={
            <>
              <SearchBar />
              <ColorSchemeToggle size={36} p={8} />
            </>
          }
        />
      }
    >
      {children}
    </AppShell>
  );
};

export default DashboardLayout;
