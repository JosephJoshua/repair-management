import {
  ActionIcon,
  MantineNumberSize,
  SpacingValue,
  SystemProp,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { FC } from 'react';

export type ColorSchemeToggleProps = {
  size?: MantineNumberSize;
  p?: SystemProp<SpacingValue>;
};

const ColorSchemeToggle: FC<ColorSchemeToggleProps> = ({ size, p }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="default"
      aria-label="Ubah tema"
      aria-live="polite"
      onClick={() => toggleColorScheme()}
      size={size}
      p={p}
    >
      {colorScheme === 'dark' ? <IconMoonStars /> : <IconSun />}
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
