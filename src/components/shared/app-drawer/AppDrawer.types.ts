import { MantineColor } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

export type DrawerCategory = {
  key: React.Key;
  title: string;
  children: DrawerItem[];
};

export type DrawerItem = {
  key: React.Key;
  title: string;
  to: string;
  icon: TablerIcon;
  color?: MantineColor;
};
