export const LOGIN = '[User] Login';
export const LOAD_TODOS = '[User] Load Todos';
export const ADD_TODO = '[User] Add Todo';
export const COMPLETE_TODO = '[User] Complete Todo';
export const DELETE_TODO = '[User] Delete Todo';
export const LOGOUT = '[User] Logout';

export function login(user) {
    return {
        type: LOGIN,
        payload: user
    }
};

export function loadTodo(todoList) {
    return {
        type: LOAD_TODOS,
        payload: todoList
    }
}

export function completeTodo(todo) {
    return {
        type: COMPLETE_TODO,
        payload: todo
    }
}

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo
    }
}