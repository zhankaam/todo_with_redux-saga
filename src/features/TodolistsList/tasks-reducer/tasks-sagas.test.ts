import {fetchTasksWorkerSaga, addTaskWorkerSaga} from "./tasks-sagas";
import {put, call} from "redux-saga/effects";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";
import {GetTasksResponse, TaskPriorities, TaskStatuses, todolistsAPI} from "../../../api/todolists-api";
import {setTasksAC} from "./tasks-reducer";

beforeEach(() => {

})

test('fetchTasksWorkerSaga success flow', () => {
    let id = 'todolistId';
    const gen = fetchTasksWorkerSaga({type: '', todolistId: id})
    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.getTasks, id))

    const fakeApiResponse: GetTasksResponse = {
        error: '',
        totalCount: 10,
        items: [{
            id: "1", title: "CSS", status: TaskStatuses.New,
            todoListId: id, description: '',
            startDate: '', deadline: '', addedDate: '',
            order: 0, priority: TaskPriorities.Low
        }]
    }

    expect(gen.next(fakeApiResponse).value).toEqual(put(setTasksAC(fakeApiResponse.items, id)))
    expect(gen.next(fakeApiResponse).value).toEqual(put(setAppStatusAC('succeeded')))
    expect(gen.next(fakeApiResponse).done).toBeTruthy()
})

test('addTaskWorkerSaga error flow', () => {
    let id = 'todolistId'
   let title = 'task title'

    const gen = addTaskWorkerSaga({type: 'TASKS/ADD-TASKS', title, todolistId: id})
    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.createTask,id,title))
    expect(gen.throw({message: 'some error'}).value).toEqual(put(setAppErrorAC('some error')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))
})