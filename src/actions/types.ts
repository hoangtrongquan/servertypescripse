import { FetchTodosAction, DeleteTodoAction } from ".";

export enum ActionTypes {
    fetchTodos,
    deleteTodo
}

export type Action = FetchTodosAction | DeleteTodoAction;