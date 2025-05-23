import { useState } from 'react'
import { CreateMark, CreateTask, CreateUser, SearchTask } from '../../'
import { IHeaderProps } from '../'
import styles from './header.module.scss'
import classNames from 'classnames'

export const Header = ({ marksRefetch, refetch }: IHeaderProps) => {

    const [activeForm, setActiveForm] = useState('')

    const getClassName = (value: string) => {
        return activeForm === value ? styles.active : ''
    }

    return (
        <div className={styles.container}>
            <div className={styles.elems}>
                <h2 className={classNames(getClassName('mark'))} onClick={() => setActiveForm(activeForm == '' || activeForm !== 'mark' ? 'mark' : '')}>Create Mark</h2>
                <h2 className={classNames(getClassName('user'))} onClick={() => setActiveForm(activeForm == '' || activeForm !== 'user' ? 'user' : '')}>Create User</h2>
                <h2 className={classNames(getClassName('task'))} onClick={() => setActiveForm(activeForm == '' || activeForm !== 'task' ? 'task' : '')}>Create Task</h2>
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