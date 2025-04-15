import { IUser } from "../../../../widgets/CreateUser/model/types/types"
import { IMark } from "../../../../widgets/CreateMark/model/types/types"

export interface ILabel {
    id: number
    caption: string
    color: string
}

export interface ITask {
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
    data: {
        tasks: ITask[]
    }
}

export interface ITaskProps {
    task: ITask
    marks: {
        data:{
            labels: IMark[]
        }
    },
}

export interface IAddMarktoTask {
    data: {
        labels: IMark[]
    }
}