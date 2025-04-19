import { IUser } from "../../../../widgets/CreateUser/model/types/types"
import { IMark } from "../../../../widgets/CreateMark/model/types/types"

export interface ILabel {
    id: number
    caption: string
    color: string
}

export interface ITask {
    id: number
    title: string
    description: string
    assignee_id: number
    created_at: Date
    task_labels: {
        label: ILabel
    }[]
    user: IUser
}

export interface ITasks {
    marks: IMark[]
}

export interface ITaskProps {
    task: ITask
    marks: IMark[]
}

export interface IAddMarktoTask {
    labels: IMark[]
}