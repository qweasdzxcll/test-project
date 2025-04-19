import { ITask } from "../../../../entities/Task"

export interface IUpdateTaskProps {
    id: number
    task: ITask
}