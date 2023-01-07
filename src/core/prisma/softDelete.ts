import { Prisma } from './generated';

const softDelete: Prisma.Middleware = async (params, next) => {
  if (params.model == undefined) return next(params);

  const now = new Date();

  //-- Queries.
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    params.action = 'findFirst';
    params.args.where['deletedAt'] = null;
  }

  if (params.action === 'findMany') {
    if (params.args.where) {
      if (params.args.where.deletedAt == undefined) {
        params.args.where.deletedAt = null;
      }
    } else {
      params.args['where'] = { deletedAt: null };
    }
  }

  //-- Mutations.
  if (params.action === 'delete') {
    params.action = 'update';
    params.args['data'] = { deletedAt: now };
  }

  if (params.action === 'deleteMany') {
    params.action = 'updateMany';

    if (params.args.data != undefined) {
      params.args.data['deletedAt'] = now;
    } else {
      params.args['data'] = { deletedAt: now };
    }
  }

  return next(params);
};

export default softDelete;
