import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    fontSize: 0,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
    border: `2px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
    }`,
    borderRadius: theme.radius.md,
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
  },
}));

export default useStyles;
