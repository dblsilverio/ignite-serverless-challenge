import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';


import schema from './schema';
import { ITodoRepository } from 'src/repositories/ITodoRepository';
import { TodoDynamoRepository } from 'src/repositories/impl/TodoDynamoRepository';

const getByUserId: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { userId } = event.pathParameters
  const repo: ITodoRepository = new TodoDynamoRepository()

  const todos = await repo.findBy(userId)

  return formatJSONResponse({ todos });
}

export const main = middyfy(getByUserId);
