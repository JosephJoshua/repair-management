export type MutationActions = 'add' | 'edit' | 'delete';

type MutationMeta = {
  action: MutationActions;
  object: string;
};

export const MutationActionMessages: Record<MutationActions, string> = {
  add: 'menambah',
  edit: 'mengubah',
  delete: 'menghapus',
};

export default MutationMeta;
