import { LOGIN, LOAD_TODOS, ADD_TODO, COMPLETE_TODO } from './userActions';

const initialState = {
    email: "",
    userId: 0,
    todoList: []
}

const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                ...state,
                email: action.payload.email,
                userId: action.payload.userId
            }
        }
        case LOAD_TODOS: {
            return {
                ...state,
                todoList: action.payload
            }
        }
        case ADD_TODO: {
            let oldList = state.todoList;
            let newList = [...oldList, action.payload];
            return {
                ...state,
                todoList: newList
            }
        }
        case COMPLETE_TODO: {
            let newList = state.todoList.filter(t => t.id !== action.payload.id);
            return {
                ...state,
                todoList: newList
            }
        }
        default: {
            return state
        }
    }
}

export default user;