import { DrawerItem, DrawerItemProps } from '@/components/drawer-item';
import {
  faCartArrowDown,
  faCartPlus,
  faClock,
  faComputer,
  faFileInvoiceDollar,
  faFilter,
  faFire,
  faGear,
  faRotateLeft,
  faScrewdriverWrench,
  faShieldVirus,
  faShop,
  faStore,
  faTriangleExclamation,
  faUser,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, ReactNode } from 'react';

type DrawerCategory = {
  title: string;
  children: DrawerItemProps[];
};

const drawerItems: readonly DrawerCategory[] = Object.freeze([
  {
    title: 'Transaksi',
    children: [
      {
        title: 'Daftar RO (Repair Order)',
        to: '/repair-orders',
        icon: faFileInvoiceDollar,
      },
      {
        title: 'Daftar RO dengan Garansi',
        to: '/under-warranty-repair-orders',
        icon: faRotateLeft,
      },
      {
        title: 'Cek Garansi RO',
        to: '/check-warranty',
        icon: faShieldVirus,
      },
    ],
  },
  {
    title: 'Sparepart',
    children: [
      { title: 'Daftar Sparepart', to: '/spareparts', icon: faStore },
      {
        title: 'Pembelian Sparepart',
        to: '/sparepart-purchases',
        icon: faCartPlus,
      },
      {
        title: 'Retur Pembelian',
        to: '/sparepart-purchase-returns',
        icon: faRotateLeft,
      },
      {
        title: 'Pemakaian Sparepart',
        to: '/sparepart-usage',
        icon: faCartArrowDown,
      },
      {
        title: 'Retur Pemakaian',
        to: '/sparepart-usage-returns',
        icon: faRotateLeft,
      },
      {
        title: 'Stock Opname',
        to: '/stock-opname',
        icon: faFilter,
      },
    ],
  },
  {
    title: 'Setup Toko',
    children: [
      { title: 'Daftar Pengguna', to: '/users', icon: faUser },
      {
        title: 'Daftar Teknisi',
        to: '/technicians',
        icon: faScrewdriverWrench,
      },
      {
        title: 'Daftar Supplier',
        to: '/suppliers',
        icon: faShop,
      },
      {
        title: 'Daftar Perangkat',
        to: '/devices',
        icon: faComputer,
      },
      { title: 'Daftar Kerusakan', to: '/damages', icon: faFire },
      {
        title: 'Daftar Kondisi',
        to: '/conditions',
        icon: faTriangleExclamation,
      },
      {
        title: 'Daftar Masa Garansi',
        to: '/warranty-periods',
        icon: faClock,
      },
    ],
  },
  {
    title: 'Pengaturan',
    children: [
      { title: 'Pengaturan Toko', to: '/store-settings', icon: faGear },
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
    <>
      {/* Background */}
      <div className="absolute top-0 -z-10 h-[24rem] w-full bg-primary"></div>

      <aside className="fixed inset-y-0 left-0 z-50 my-4 ml-5 grid w-full max-w-xs grid-flow-row grid-cols-1 grid-rows-[auto,minmax(0,1fr),auto] flex-wrap items-center justify-between rounded-2xl border-0 bg-white pt-4 pb-2 antialiased shadow-xl transition-transform duration-200">
        <div>
          {/* Logo */}
          <div className="flex h-8 items-end justify-center px-6">
            <h1 className="text-xl font-semibold">
              <span className="text-primary">Re</span>
              <span className="text-secondary">Mana</span>
            </h1>
          </div>

          <div className="mt-3 mb-4 h-px bg-gradient-to-r from-slate-100 via-primary/10 to-slate-100"></div>
        </div>

        {/* Drawer Items */}
        <div className="h-full w-full overflow-auto px-3">
          {drawerItems.map((item, idx) => {
            return (
              <React.Fragment key={item.title}>
                <h2 className="mb-1.5 ml-4 text-sm font-semibold uppercase text-primary">
                  {item.title}
                </h2>

                <ul
                  className={idx === drawerItems.length - 1 ? 'mb-1' : 'mb-6'}
                >
                  {item.children.map((i) => {
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

        <div className="mt-3 flex items-center gap-4 px-4">
          <div className="rounded-full">
            <FontAwesomeIcon className="h-8 w-8" icon={faUserCircle} />
          </div>

          <div className="flex flex-col text-primary">
            <span className="font-semibold">Admin</span>
            <span className="font-medium">Point Service Center</span>
          </div>
        </div>
      </aside>

      <div className="ml-[21.5rem] px-4 pt-6 pb-8">{children}</div>
    </>
  );
};

export default DashboardLayout;
