import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { ITODO, ITodoRepository } from 'src/repositories/ITodoRepository';
import { TodoDynamoRepository } from 'src/repositories/impl/TodoDynamoRepository';

const createTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { userId } = event.pathParameters
  const todo = event.body as ITODO

  const todoRepository: ITodoRepository = new TodoDynamoRepository()

  todoRepository.save({ ...todo, userId })

  return formatJSONResponse({}, 201);
}

export const main = middyfy(createTodo);
