import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    textDecoration: 'none',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
  activeLink: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors[theme.primaryColor][6]
        : theme.colors[theme.primaryColor][4],
    color: theme.white,

    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5],
    },
  },
  userBar: {
    paddingTop: theme.spacing.sm,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  categoryItem: {
    paddingRight: theme.spacing.xs,
    '&[data-active]': {
      background: 'transparent',
    },
  },
}));

export default useStyles;
