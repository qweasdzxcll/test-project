import { IMark } from "../../../../widgets/CreateMark/model/types/types";

export interface ILabelsList {
    marks: IMark[]
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}