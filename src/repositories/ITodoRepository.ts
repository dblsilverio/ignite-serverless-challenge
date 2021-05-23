export interface ITODO {
    id?: string
    userId: string
    title: string
    done?: Boolean
    deadline: Date
}

export interface ITodoRepository {

    save(todo: ITODO): Promise<void>
    findBy(userId: string): Promise<ITODO[]>

}