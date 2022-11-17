import { DrawerItem } from '@/components/drawer-item';
import ThemeSwitcher from '@/components/theme-switcher/ThemeSwitcher';
import {
  ArrowUpTrayIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  FunnelIcon,
  ReceiptPercentIcon,
  ReceiptRefundIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
import React, { FC, ReactNode } from 'react';

type DrawerItem = {
  title: string;
  to: string;
  icon: React.ElementType;
};

type DrawerThemeSwitcherItem = {
  isThemeSwitcher: true;
};

type DrawerCategory = {
  title: string;
  children: (DrawerItem | DrawerThemeSwitcherItem)[];
};

const drawerItems: readonly DrawerCategory[] = Object.freeze([
  {
    title: 'Transaksi',
    children: [
      {
        title: 'Daftar RO (Repair Order)',
        to: '/repair-orders',
        icon: ReceiptPercentIcon,
      },
      {
        title: 'Daftar RO dengan Garansi',
        to: '/under-warranty-repair-orders',
        icon: ReceiptRefundIcon,
      },
      {
        title: 'Cek Garansi RO',
        to: '/check-warranty',
        icon: ShieldCheckIcon,
      },
    ],
  },
  {
    title: 'Sparepart',
    children: [
      { title: 'Daftar Sparepart', to: '/spareparts', icon: ShoppingBagIcon },
      {
        title: 'Pembelian Sparepart',
        to: '/sparepart-purchases',
        icon: ShoppingCartIcon,
      },
      {
        title: 'Retur Pembelian',
        to: '/sparepart-purchase-returns',
        icon: ReceiptRefundIcon,
      },
      {
        title: 'Pemakaian Sparepart',
        to: '/sparepart-usage',
        icon: ArrowUpTrayIcon,
      },
      {
        title: 'Retur Pemakaian',
        to: '/sparepart-usage-returns',
        icon: ReceiptRefundIcon,
      },
      {
        title: 'Stock Opname',
        to: '/stock-opname',
        icon: FunnelIcon,
      },
    ],
  },
  {
    title: 'Setup Toko',
    children: [
      { title: 'Daftar Pengguna', to: '/users', icon: UserCircleIcon },
      {
        title: 'Daftar Teknisi',
        to: '/technicians',
        icon: WrenchScrewdriverIcon,
      },
      {
        title: 'Daftar Supplier',
        to: '/suppliers',
        icon: BuildingStorefrontIcon,
      },
      { title: 'Daftar Sparepart', to: '/spareparts', icon: ShoppingBagIcon },
      {
        title: 'Daftar Perangkat',
        to: '/devices',
        icon: DevicePhoneMobileIcon,
      },
      { title: 'Daftar Kerusakan', to: '/damages', icon: FireIcon },
      {
        title: 'Daftar Kondisi',
        to: '/conditions',
        icon: ShieldExclamationIcon,
      },
      {
        title: 'Daftar Masa Garansi',
        to: '/warranty-periods',
        icon: ClockIcon,
      },
    ],
  },
  {
    title: 'Pengaturan',
    children: [
      { title: 'Pengaturan Toko', to: '/store-settings', icon: Cog6ToothIcon },
      { isThemeSwitcher: true },
    ],
  },
]);

export type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => {
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content p-4">{children}</div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div className="flex flex-col menu p-4 w-85 bg-base-100 text-base-content">
          <h1 className="text-xl font-semibold mb-4 ml-2">
            <span className="text-primary">Re</span>
            <span>Mana</span>
          </h1>

          <div className="avatar flex flex-col items-center">
            <div className="w-24 rounded-full">
              <UserCircleIcon />
            </div>

            <span className="mt-2">Admin</span>
            <span className="mt-0.5">Point Service Center</span>
          </div>

          <div className="divider my-3"></div>

          {drawerItems.map((item) => {
            return (
              <React.Fragment key={item.title}>
                <h2 className="uppercase text-sm font-semibold text-primary ml-2 mb-2">
                  {item.title}
                </h2>

                <ul className="mb-4">
                  {item.children.map((i) => {
                    if ('isThemeSwitcher' in i) {
                      return (
                        <li key="theme-switcher">
                          <ThemeSwitcher />
                        </li>
                      );
                    }

                    return (
                      <li key={i.to}>
                        <DrawerItem {...i} />
                      </li>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
