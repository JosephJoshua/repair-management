import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { AnyZodObject, z, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export type HandlerFunction<T extends AnyZodObject> = (
  // Replace the properties in the original
  // `NextApiRequest` by first omitting it and then
  // adding it back with the inferred type.
  req: Omit<NextApiRequest, keyof z.infer<T>> & z.infer<T>,
  res: NextApiResponse
) => Promise<void>;

export type HandlerOption<T extends AnyZodObject> = {
  schema: T;
  handler: HandlerFunction<T>;
};

export type HandlerOptions<
  A extends AnyZodObject,
  B extends AnyZodObject,
  C extends AnyZodObject,
  D extends AnyZodObject,
  E extends AnyZodObject
> = {
  get?: HandlerOption<A>;
  post?: HandlerOption<B>;
  put?: HandlerOption<C>;
  patch?: HandlerOption<D>;
  delete?: HandlerOption<E>;
};

const handle = <
  A extends AnyZodObject,
  B extends AnyZodObject,
  C extends AnyZodObject,
  D extends AnyZodObject,
  E extends AnyZodObject
>({
  get,
  post,
  put,
  patch,
  delete: del,
}: HandlerOptions<A, B, C, D, E>) => {
  const methodHandlers = {
    GET: get,
    POST: post,
    PUT: put,
    PATCH: patch,
    DELETE: del,
  };

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method as keyof typeof methodHandlers;

    if (req.method == null || methodHandlers[method] == null) {
      const allowedMethods = Object.entries(methodHandlers).reduce<string[]>(
        (acc, [method, handler]) => {
          if (handler) return acc.concat(method);
          return acc;
        },
        []
      );

      const allowedMethodsStr = [...allowedMethods, 'OPTIONS'].join(', ');

      if (req.method === 'OPTIONS') {
        // TODO: replace this with proper CORS support.
        res.setHeader('Allow', allowedMethodsStr);
        res.status(200).end();

        return;
      }

      res.status(405).send({
        error: {
          type: 'MethodNotAllowed',
          details: {
            allowedMethods,
          },
        },
      });

      return;
    }

    const option = methodHandlers[method];
    if (option == null) return;

    const { schema, handler } = option;

    try {
      // We need to pass the parsed schema along with
      // the request to preserve default values.
      const parsed = await schema.parseAsync(req);
      await handler({ ...req, ...parsed } as NextApiRequest, res);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).send({ error: fromZodError(err) });
        return;
      }

      handleException(req, res, err);
    }
  };
};

/**
 * @see https://giancarlobuomprisco.com/next/handling-api-errors-in-nextjs
 */
const handleException = (
  req: NextApiRequest,
  res: NextApiResponse,
  exception: unknown
) => {
  const { url, headers } = req;

  const statusCode = getExceptionStatus(exception);
  const message = getExceptionMessage(exception);
  const stack = getExceptionStack(exception);

  const referer = headers['referer'];
  const userAgent = headers['user-agent'];

  const ctx = {
    url,
    referer,
    userAgent,
    message,
  };

  // TODO: add logger.
  if (process.env.NODE_ENV !== 'production') {
    console.warn('an unhandled exception occured', ctx, stack);
  }

  const timestamp = new Date().toISOString();
  res.status(statusCode).send({
    error: {
      type: 'UnknownError',
      details: {
        statusCode,
        timestamp,
        path: url,
      },
    },
  });
};

const getExceptionStatus = (exception: unknown) => {
  return exception instanceof ApiError ? exception.statusCode : 500;
};

const getExceptionMessage = (exception: unknown) => {
  return isError(exception) ? exception.message : `internal server error`;
};

const getExceptionStack = (exception: unknown) => {
  return isError(exception) ? exception.stack : undefined;
};

const isError = (exception: unknown): exception is Error => {
  return exception instanceof Error;
};

export default handle;
