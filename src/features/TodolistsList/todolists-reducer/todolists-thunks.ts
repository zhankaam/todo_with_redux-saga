export const a = 0;
// thunks

// export const fetchTodolistsTC_ = () => {
//     return (dispatch: ThunkDispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsAPI.getTodolists()
//             .then((res) => {
//                 dispatch(setTodolistsAC(res.data))
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//             .catch(error => {
//                 handleServerNetworkError(error, dispatch);
//             })
//     }
// }


// export const removeTodolistTC_ = (todolistId: string) => {
//     return (dispatch: ThunkDispatch) => {
//         //изменим глобальный статус приложения, чтобы вверху полоса побежала
//         dispatch(setAppStatusAC('loading'))
//         //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
//         dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(removeTodolistAC(todolistId))
//                 //скажем глобально приложению, что асинхронная операция завершена
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }


// export const addTodolistTC_ = (title: string) => {
//     return (dispatch: ThunkDispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsAPI.createTodolist(title)
//             .then((res) => {
//                 dispatch(addTodolistAC(res.data.data.item))
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }


// export const changeTodolistTitleTC_ = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todolistsAPI.updateTodolist(id, title)
//             .then((res) => {
//                 dispatch(changeTodolistTitleAC(id, title))
//             })
//     }
// }

//type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
