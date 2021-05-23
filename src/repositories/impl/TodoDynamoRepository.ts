import { document } from "src/utils/dynamodbClient";
import { ITODO, ITodoRepository } from "../ITodoRepository";
import { v4 as uuidv4 } from 'uuid';

export class TodoDynamoRepository implements ITodoRepository {

    constructor(
        private readonly documentClient = document,
        private readonly tableName = process.env.TODO_TABLE_NAME,
        private readonly byUserIndex = process.env.IX_TODO_USER_ID
    ) { }

    async save(todo: ITODO): Promise<void> {
        await this.documentClient.put({
            TableName: this.tableName,
            Item: {
                ...todo,
                done: false,
                id: uuidv4()
            }
        }).promise()
    }

    async findBy(userId: string): Promise<ITODO[]> {
        console.log(this.byUserIndex)
        const result = await this.documentClient.query({
            TableName: this.tableName,
            IndexName: this.byUserIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }

        }).promise()

        console.log(result.Items)
        if (result.Count !== 0) {
            return result.Items as ITODO[]
        }

        return [];
    }

}