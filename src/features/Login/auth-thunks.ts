export const a = 0;
// thunks
// export const loginTC_ = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
//     dispatch(setAppStatusAC('loading'))
//     authAPI.login(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true))
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

// export const logoutTC_ = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
//     dispatch(setAppStatusAC('loading'))
//     authAPI.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(false))
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
