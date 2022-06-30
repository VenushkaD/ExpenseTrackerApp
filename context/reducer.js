import {
  ADD_EXPENSE_BEGIN,
  ADD_EXPENSE_ERROR,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_BEGIN,
  DELETE_EXPENSE_ERROR,
  DELETE_EXPENSE_SUCCESS,
  GET_EXPENSES_BEGIN,
  GET_EXPENSES_ERROR,
  GET_EXPENSES_SUCCESS,
  UPDATE_EXPENSE_BEGIN,
  UPDATE_EXPENSE_ERROR,
  UPDATE_EXPENSE_SUCCESS,
} from './actions';

export default reducer = (state, action) => {
  switch (action.type) {
    case ADD_EXPENSE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_EXPENSE_SUCCESS:
      // const id = new Date().toString() + Math.random().toString();
      return {
        ...state,
        isLoading: false,
        allExpenses: [{ ...action.payload }, ...state.allExpenses],
      };

    case ADD_EXPENSE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        errorMessage: action.payload.errorMessage,
      };

    case UPDATE_EXPENSE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_EXPENSE_SUCCESS:
      let copyOfExpenses = [...state.allExpenses];
      copyOfExpenses = copyOfExpenses.map((expense) => {
        if (expense.id === action.payload.id) {
          expense = { ...expense, ...action.payload };
        }
        return expense;
      });

      return {
        ...state,
        isLoading: false,
        allExpenses: [...copyOfExpenses],
      };

    case UPDATE_EXPENSE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        errorMessage: action.payload.errorMessage,
      };

    case DELETE_EXPENSE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allExpenses: [
          ...state.allExpenses.filter(
            (expense) => expense.id !== action.payload.id
          ),
        ],
      };

    case DELETE_EXPENSE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        errorMessage: action.payload.errorMessage,
      };

    case GET_EXPENSES_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allExpenses: [...action.payload.expenses],
      };

    case GET_EXPENSES_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
