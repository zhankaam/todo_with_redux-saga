import {call, put, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from "../../utils/error-utils";
import {setIsLoggedInAC} from "./auth-reducer";

// sagas
export function* loginWorkerSaga(action: ReturnType<typeof login>) {
    yield put(setAppStatusAC('loading'))
    try {
        const res = yield call(authAPI.login,action.data)
        if (res.data.resultCode === 0) {
            yield put(setIsLoggedInAC(true))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield handleServerAppErrorSaga(res.data)
        }
    } catch (err) {
        yield handleServerNetworkErrorSaga(err)
    }
}

export const login = (data: LoginParamsType) => ({type: 'AUTH/LOGIN',data})

export function* logoutWorkerSaga() {
    yield put(setAppStatusAC('loading'))
    try {
        const res = yield call(authAPI.logout)
        if (res.data.resultCode === 0) {
            yield put(setIsLoggedInAC(false))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield handleServerAppErrorSaga(res.data)
        }
    } catch (err) {
        yield handleServerNetworkErrorSaga(err)
    }
}

export const logout = () => ({type: 'AUTH/LOGOUT'})

export function* authWatcherSaga() {
    yield takeEvery('AUTH/LOGIN',loginWorkerSaga )
    yield takeEvery('AUTH/LOGOUT',logoutWorkerSaga )
}