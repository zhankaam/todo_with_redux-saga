import {initializeAppWorkerSaga} from "./app-sagas";
import {authAPI, MeResponseType} from "../api/todolists-api";
import {call, put} from "redux-saga/effects";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {setAppInitializedAC} from "./app-reducer";

let meResponse: MeResponseType;
beforeEach(() => {
    meResponse = {
        resultCode: 0,
        data: {
            login: '',
            email: '',
            id: 123
        },
        messages: []
    }
})

test('initializeAppWorkerSaga login success', () => {
    const gen = initializeAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authAPI.me))

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setIsLoggedInAC(true)))

    result = gen.next()
    expect(result.value).toEqual(put(setAppInitializedAC(true)))
})

test('initializeAppWorkerSaga login unsuccess', () => {
    const gen = initializeAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authAPI.me))

    meResponse.resultCode = 1
    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setAppInitializedAC(true)))
})