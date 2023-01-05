import SortDirection from '@/core/types/SortDirection';

const sortBy = <T extends object>(
  arr: T[],
  by: keyof T,
  direction: SortDirection
) => {
  return arr.sort((a, b) => {
    const first = a[by];
    const second = b[by];

    const comp = (() => {
      if (first == null) return 1;
      if (second == null) return -1;

      return first
        .toString()
        .localeCompare(second.toString(), undefined, { numeric: true });
    })();

    return direction === 'asc' ? comp : -comp;
  });
};

export default sortBy;
