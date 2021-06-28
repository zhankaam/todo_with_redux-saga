import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: ( todolistId: string,id: string, status: TaskStatuses) => void
    changeTaskTitle: ( todolistId: string,taskId: string, newTitle: string) => void
    removeTask: (todolistId: string,taskId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask( props.todolistId,props.task.id), [props.todolistId,props.task.id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId,props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId,props.task.id, newValue)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
