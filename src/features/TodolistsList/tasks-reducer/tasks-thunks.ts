export const a = 9;

// thunks

// export const fetchTasksTC_ = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
//     dispatch(setAppStatusAC('loading'))
//     todolistsAPI.getTasks(todolistId)
//         .then((res) => {
//             const tasks = res.data.items
//             dispatch(setTasksAC(tasks, todolistId))
//             dispatch(setAppStatusAC('succeeded'))
//         })
// }

// export const removeTaskTC_ = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
//     todolistsAPI.deleteTask(todolistId, taskId)
//         .then(res => {
//             const action = removeTaskAC(taskId, todolistId)
//             dispatch(action)
//         })
// }

// export const addTaskTC_ = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
//     dispatch(setAppStatusAC('loading'))
//     todolistsAPI.createTask(todolistId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 const task = res.data.data.item
//                 const action = addTaskAC(task)
//                 dispatch(action)
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }


// export const updateTaskTC_ = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
//     (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             //throw new Error("task not found in the state");
//             console.warn('task not found in the state')
//             return
//         }
//
//         const apiModel: UpdateTaskModelType = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             title: task.title,
//             status: task.status,
//             ...domainModel
//         }
//
//         todolistsAPI.updateTask(todolistId, taskId, apiModel)
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//                     const action = updateTaskAC(taskId, domainModel, todolistId)
//                     dispatch(action)
//                 } else {
//                     handleServerAppError(res.data, dispatch);
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error, dispatch);
//             })
//     }

//type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
