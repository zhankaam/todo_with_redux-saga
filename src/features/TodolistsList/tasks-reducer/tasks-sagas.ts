import {call, put, select, takeEvery} from "redux-saga/effects";
import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    UpdateDomainTaskModelType,
    updateTaskAC
} from "./tasks-reducer";
import {setAppStatusAC} from "../../../app/app-reducer";
import {GetTasksResponse, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-api";
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from "../../../utils/error-utils";
import {AppRootStateType} from "../../../app/store";

// sagas
export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const data: GetTasksResponse = yield call(todolistsAPI.getTasks, action.todolistId)
    const tasks = data.items
    yield put(setTasksAC(tasks, action.todolistId))
    yield put(setAppStatusAC('succeeded'))
}

export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId})

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTasks>) {
    yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)
    yield put(removeTaskAC(action.todolistId, action.taskId))
}

export const removeTasks = (todolistId: string, taskId: string) => ({type: 'TASKS/REMOVE-TASKS', todolistId, taskId})

export function* addTaskWorkerSaga(action: ReturnType<typeof addTasks>) {
    yield put(setAppStatusAC('loading'))
    try {
        const res = yield call(todolistsAPI.createTask, action.todolistId, action.title)
        if (res.data.resultCode === 0) {
            yield put(addTaskAC(res.data.data.item))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield* handleServerAppErrorSaga(res.data);
        }
    } catch (err) {
        yield* handleServerNetworkErrorSaga(err)
    }
}

export const addTasks = (title: string, todolistId: string) => ({type: 'TASKS/ADD-TASKS', title, todolistId})


export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {

    const state: AppRootStateType = yield select()
    const task = state.tasks[action.todolistId].find(t => t.id === action.taskId)
    if (!task) {
        //throw new Error("task not found in the state");
        console.warn('task not found in the state')
        return
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...action.domainModel
    }

    try {
        const res = yield call(todolistsAPI.updateTask, action.todolistId, action.taskId, apiModel)
        if (res.data.resultCode === 0) {
            yield put(updateTaskAC(action.todolistId,action.taskId, action.domainModel))
        } else {
            yield* handleServerAppErrorSaga(res.data);
        }
    } catch (err) {
        yield* handleServerNetworkErrorSaga(err);
    }

}

export const updateTask = (todolistId: string,taskId: string, domainModel: UpdateDomainTaskModelType) => ({
    type: 'TASKS/UPDATE-TASKS',
    todolistId,
    taskId,
    domainModel
})


export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE-TASKS', removeTaskWorkerSaga)
    yield takeEvery('TASKS/ADD-TASKS', addTaskWorkerSaga)
    yield takeEvery('TASKS/UPDATE-TASKS', updateTaskWorkerSaga)
}