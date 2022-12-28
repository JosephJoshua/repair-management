import { Box } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons';
import { FC } from 'react';
import useStyles from './EmptyIndicator.styles';

const EmptyIndicator: FC = () => {
  const { classes } = useStyles();

  return (
    <Box p={4} mb={8} className={classes.container}>
      <IconMoodSad size={36} strokeWidth={1.5} />
    </Box>
  );
};

export default EmptyIndicator;
