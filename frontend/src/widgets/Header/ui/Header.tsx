import { useState } from 'react'
import { CreateMark, CreateTask, CreateUser, SearchTask } from '../../'
import { IHeaderProps } from '../'
import styles from './header.module.scss'
import classNames from 'classnames'

export const Header = ({ marksRefetch, refetch }: IHeaderProps) => {

    const [activeForm, setActiveForm] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.elems}>
                <h2 className={classNames(activeForm == 'mark' ? styles.active : '')} onClick={() => setActiveForm(activeForm == '' || activeForm !== 'mark'  ? 'mark' : '')}>Create Mark</h2>
                <h2 className={classNames(activeForm == 'user' ? styles.active : '')} onClick={() => setActiveForm(activeForm == '' || activeForm !== 'user' ? 'user' : '')}>Create User</h2>
                <h2 className={classNames(activeForm == 'task' ? styles.active : '')} onClick={() => setActiveForm(activeForm == '' || activeForm !== 'task' ? 'task' : '')}>Create Task</h2>
                <SearchTask />
            </div>
            <div className={styles.form}>
                {activeForm == 'mark' ? (
                    <CreateMark refetch={marksRefetch} />
                ) : activeForm == 'user' ? (
                    <CreateUser />
                ) : activeForm == 'task' ? (
                    <CreateTask refetch={refetch} />
                ) : null
                }
            </div>
        </div>
    )
}