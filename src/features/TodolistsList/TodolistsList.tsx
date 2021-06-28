import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
    changeTodolistFilterAC,
    FilterValuesType,
    TodolistDomainType
} from './todolists-reducer/todolists-reducer'
import { TasksStateType} from './tasks-reducer/tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from 'react-router-dom'
import {changeTodolistTitles, fetchTodolists, removeTodolists, addTodolists} from "./todolists-reducer/todolists-sagas";
import {addTasks, removeTasks, updateTask} from './tasks-reducer/tasks-sagas'

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }

        dispatch(fetchTodolists())
    }, [])

    const removeTask = useCallback(function ( todolistId: string,id: string) {
        dispatch(removeTasks(todolistId,id))
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch( addTasks(title, todolistId))
    }, [])

    const changeStatus = useCallback(function ( todolistId: string,id: string, status: TaskStatuses) {
        dispatch(updateTask( todolistId,id, {status}))
    }, [])

    const changeTaskTitle = useCallback(function ( todolistId: string,id: string, newTitle: string) {
        dispatch( updateTask(todolistId,id, {title: newTitle} ))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolists(id))
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitles(id, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolists(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
