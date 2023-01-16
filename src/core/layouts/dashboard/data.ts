import {
  IconAdjustments,
  IconBuildingStore,
  IconBuildingWarehouse,
  IconCodeMinus,
  IconCodePlus,
  IconDeviceDesktop,
  IconExclamationCircle,
  IconFileInvoice,
  IconFlame,
  IconHourglass,
  IconSettings,
  IconShieldCheck,
  IconShieldLock,
  IconShoppingCartPlus,
  IconShoppingCartX,
  IconTools,
  IconUser,
} from '@tabler/icons';
import { DrawerCategory } from './app-drawer/AppDrawer.types';

export const drawerCategories = Object.freeze<DrawerCategory[]>([
  {
    key: 'transactions',
    title: 'Transaksi',
    children: [
      {
        key: 'repair-orders',
        title: 'Daftar RO (Repair Order)',
        to: '/dashboard/repair-orders',
        icon: IconFileInvoice,
        color: 'violet',
      },
      {
        key: 'under-warranty-repair-orders',
        title: 'Daftar RO dengan Garansi',
        to: '/dashboard/under-warranty-repair-orders',
        icon: IconShieldLock,
        color: 'orange',
      },
      {
        key: 'check-warranty',
        title: 'Cek Garansi RO',
        to: '/dashboard/check-warranty',
        icon: IconShieldCheck,
        color: 'green',
      },
    ],
  },
  {
    key: 'sparepart',
    title: 'Sparepart',
    children: [
      {
        key: 'spareparts',
        title: 'Daftar Sparepart',
        to: '/dashboard/spareparts',
        icon: IconBuildingWarehouse,
        color: 'cyan',
      },
      {
        key: 'sparepart-purchases',
        title: 'Pembelian Sparepart',
        to: '/dashboard/sparepart-purchases',
        icon: IconShoppingCartPlus,
        color: 'grape',
      },
      {
        key: 'sparepart-purchase-returns',
        title: 'Retur Pembelian',
        to: '/dashboard/sparepart-purchase-returns',
        icon: IconShoppingCartX,
        color: 'red',
      },
      {
        key: 'sparepart-usage',
        title: 'Pemakaian Sparepart',
        to: '/dashboard/sparepart-usage',
        icon: IconCodePlus,
        color: 'grape',
      },
      {
        key: 'sparepart-usage-returns',
        title: 'Retur Pemakaian',
        to: '/dashboard/sparepart-usage-returns',
        icon: IconCodeMinus,
        color: 'red',
      },
      {
        key: 'stock-opname',
        title: 'Stock Opname',
        to: '/dashboard/stock-opname',
        icon: IconAdjustments,
        color: 'indigo',
      },
    ],
  },
  {
    key: 'store-setup',
    title: 'Setup Toko',
    children: [
      {
        key: 'users',
        title: 'Daftar Pengguna',
        to: '/dashboard/users',
        icon: IconUser,
        color: 'yellow',
      },
      {
        key: 'technicians',
        title: 'Daftar Teknisi',
        to: '/dashboard/technicians',
        icon: IconTools,
        color: 'grape',
      },
      {
        key: 'suppliers',
        title: 'Daftar Supplier',
        to: '/dashboard/suppliers',
        icon: IconBuildingStore,
        color: 'violet',
      },
      {
        key: 'devices',
        title: 'Daftar Perangkat',
        to: '/dashboard/devices',
        icon: IconDeviceDesktop,
        color: 'teal',
      },
      {
        key: 'damages',
        title: 'Daftar Kerusakan',
        to: '/dashboard/damages',
        icon: IconFlame,
        color: 'red',
      },
      {
        key: 'conditions',
        title: 'Daftar Kondisi',
        to: '/dashboard/conditions',
        icon: IconExclamationCircle,
        color: 'orange',
      },
      {
        key: 'warranty-periods',
        title: 'Daftar Masa Garansi',
        to: '/dashboard/warranty-periods',
        icon: IconHourglass,
        color: 'green',
      },
    ],
  },
  {
    key: 'settings',
    title: 'Pengaturan',
    children: [
      {
        key: 'store-settings',
        title: 'Pengaturan Toko',
        to: '/dashboard/store-settings',
        icon: IconSettings,
      },
    ],
  },
]);