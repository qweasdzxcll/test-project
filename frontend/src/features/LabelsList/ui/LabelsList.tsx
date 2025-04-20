import { ILabelsList } from '../'

export const LabelsList = ({ marks, handleSelectChange }: ILabelsList) => {
    return (
        <select onChange={handleSelectChange}>
            <option>Выберите метку</option>
            {marks &&
                marks.map(item => <option key={item.id} value={item.id}>{item.caption}</option>)
            }
        </select>
    )
}