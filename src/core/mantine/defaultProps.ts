import { KbdProps, TextInputProps, TooltipProps } from '@mantine/core';
import { ModalSettings } from '@mantine/modals/lib/context';

export const defaultKbdProps: Partial<KbdProps> = {
  styles: {
    root: {
      minWidth: '1.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
    },
  },
};

export const defaultTextInputProps: Partial<TextInputProps> = {
  styles: (theme) => ({
    error: {
      fontWeight: 500,
      color: theme.colors.red[7],
    },
  }),
};

export const defaultTooltipProps: Partial<TooltipProps> = {
  styles: (theme) => ({ tooltip: { fontSize: theme.fontSizes.xs } }),
};

export const defaultModalProps: ModalSettings = {
  styles: (theme) => ({
    title: { fontWeight: 600 },
    close: { color: theme.colorScheme === 'dark' ? theme.white : theme.black },
  }),
  overflow: 'outside',
  centered: true,
};
