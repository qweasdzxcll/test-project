import { IDeleteLabelProps } from '../'
import styles from './DeleteLabel.module.scss'

export const DeleteLabel = ({ deleteLabel, setIsOpenDelete, confirmDelete }: IDeleteLabelProps) => {
    return (
        <div className={styles.delete_form}>
            <h2>Вы точно хотите удалить {deleteLabel.title}?</h2>
            <button style={{ marginRight: '20px' }} onClick={() => { setIsOpenDelete(false), confirmDelete() }}>Да</button>
            <button onClick={() => setIsOpenDelete(false)}>Нет</button>
        </div>
    )
}