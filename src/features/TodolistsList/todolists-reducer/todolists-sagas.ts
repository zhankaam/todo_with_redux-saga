// sagas
import {call, put, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../../app/app-reducer";
import {todolistsAPI} from "../../../api/todolists-api";
import {handleServerNetworkErrorSaga} from "../../../utils/error-utils";
import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "./todolists-reducer";

export function* fetchTodolistsWorkerSaga() {
    yield put(setAppStatusAC('loading'))
    const res = yield call(todolistsAPI.getTodolists)
    try {
        yield put(setTodolistsAC(res.data))
        yield put(setAppStatusAC('succeeded'))
    } catch (err) {
        handleServerNetworkErrorSaga(err);
    }
}

export const fetchTodolists = () => ({type: 'TODOLISTS/FETCH-TODOLISTS'})

export function* removeTodolistWorkerSaga(action: ReturnType<typeof removeTodolist>) {
    yield put(setAppStatusAC('loading'))
    yield put(changeTodolistEntityStatusAC(action.todolistId, 'loading'))
    yield call(todolistsAPI.deleteTodolist, action.todolistId)
    yield put(removeTodolistAC(action.todolistId))
    yield put(setAppStatusAC('succeeded'))
}

export const removeTodolist = (todolistId: string) => ({type: 'TODOLISTS/REMOVE-TODOLISTS', todolistId})

export function* addTodolistWorkerSaga(action: ReturnType<typeof addTodolist>) {
    yield put(setAppStatusAC('loading'))
    const res = yield call(todolistsAPI.createTodolist, action.title)
    yield put(addTodolistAC(res.data.data.item))
    yield put(setAppStatusAC('succeeded'))
}

export const addTodolist = (title: string) => ({type: 'TODOLISTS/ADD-TODOLISTS', title})

export function* changeTodolistTitleWorkerSaga(action: ReturnType<typeof changeTodolistTitle>) {
    yield call(todolistsAPI.updateTodolist, action.id, action.title)
    yield put(changeTodolistTitleAC(action.id, action.title))
}

export const changeTodolistTitle = (id: string, title: string) => ({type: 'TODOLISTS/CHANGE-TODOLIST-TITLE', id, title})

export function* todolistsWatcherSaga() {
    yield takeEvery('TODOLISTS/FETCH-TODOLISTS', fetchTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/REMOVE-TODOLISTS', removeTodolistWorkerSaga)
    yield takeEvery('TODOLISTS/ADD-TODOLISTS', addTodolistWorkerSaga)
    yield takeEvery('TODOLISTS/CHANGE-TODOLIST-TITLE', changeTodolistTitleWorkerSaga)
}
