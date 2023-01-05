import {
  Center,
  Group,
  Stack,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons';
import axios from 'axios';
import { FC } from 'react';

export type FetchErrorIndicatorProps = {
  onRefetch?: () => void;
  error?: object;
};

const FetchErrorIndicator: FC<FetchErrorIndicatorProps> = ({
  onRefetch,
  error,
}) => {
  const theme = useMantineTheme();
  const message = (() => {
    if (error == null) return '';

    if (axios.isAxiosError(error) && error.response != null) {
      const { statusText, data } = error.response;
      let message = statusText;

      if (typeof data.error === 'object') {
        message += ` - ${data.error.type}`;
      }

      return message;
    }

    if ('message' in error && typeof error.message === 'string')
      return error.message;

    return error.toString();
  })();

  return (
    <Center h="100%">
      <Stack align="center" spacing="xs">
        <IconExclamationCircle size="64" color={theme.colors.red[7]} />

        <Group
          sx={{ textAlign: 'center', justifyContent: 'center' }}
          spacing={4}
        >
          <span>Gagal mendapatkan data!</span>
          {onRefetch && (
            <UnstyledButton
              sx={(theme) => ({
                color: theme.colors[theme.primaryColor][5],
                '&:hover': {
                  color: theme.colors[theme.primaryColor][4],
                },
              })}
              onClick={() => onRefetch()}
            >
              Coba kembali
            </UnstyledButton>
          )}
        </Group>

        {message}
      </Stack>
    </Center>
  );
};

export default FetchErrorIndicator;
