export interface IDeleteLabel {
    title: string
    id: number
}

export interface IDeleteLabelProps {
    deleteLabel: IDeleteLabel
    setIsOpenDelete: (value: boolean) => void
    confirmDelete: () => void
}