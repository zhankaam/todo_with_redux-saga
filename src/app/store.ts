import {fetchTasksWorkerSaga, removeTaskWorkerSaga, tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer, initializeAppWorkerSaga} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// создаем промежуточный слой сага мидлвэйр
const sagaMiddleware = createSagaMiddleware()

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware,sagaMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// затем запускаем сагу
sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga);
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga);
    yield takeEvery('TASKS/REMOVE-TASKS', removeTaskWorkerSaga);
}

// function* rootWorker() {
//     alert("rootWorker")
// }
//
// setTimeout(() => {
//     // @ts-ignore
//     store.dispatch({type: "ACTIVATOR-ACTION-TYPE"})
// },2000)

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
