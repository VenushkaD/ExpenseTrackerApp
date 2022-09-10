import axios from 'axios';
import React, { useContext, createContext, useState, useReducer } from 'react';
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
import reducer from './reducer';
import { FIREBASE_DATABASE_URL } from '@env';

const AppContext = createContext();

const useAppContext = () => {
  return useContext(AppContext);
};

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-06-30'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-06-29'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-06-28'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 3.69,
    date: new Date('2022-06-25'),
  },
  {
    id: 'e5',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e6',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e7',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-09-10'),
  },
  {
    id: 'e8',
    description: 'A book',
    amount: 3.69,
    date: new Date('2022-01-01'),
  },
];

const initialState = {
  allExpenses: [],
  isLoading: false,
  showAlert: false,
  errorMessage: '',
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const httpFetch = axios.create({
    baseURL: FIREBASE_DATABASE_URL,
  });

  const addExpense = async ({ description, amount, date }) => {
    dispatch({ type: ADD_EXPENSE_BEGIN });
    try {
      const response = await httpFetch.post('expenses.json', {
        description,
        amount,
        date,
      });
      const id = response.data.name;
      dispatch({
        type: ADD_EXPENSE_SUCCESS,
        payload: { id, description, amount, date },
      });
    } catch (error) {
      dispatch({
        type: ADD_EXPENSE_ERROR,
        payload: { errorMessage: error.message },
      });
    }
  };

  const deleteExpense = async (id) => {
    dispatch({ type: DELETE_EXPENSE_BEGIN });
    try {
      await httpFetch.delete(`/expenses/${id}.json`);
      dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: { id } });
    } catch (error) {
      dispatch({
        type: DELETE_EXPENSE_ERROR,
        payload: { errorMessage: error.message },
      });
    }
  };

  const updateExpense = async ({ id, description, amount, date }) => {
    dispatch({ type: UPDATE_EXPENSE_BEGIN });
    try {
      await httpFetch.put(`/expenses/${id}.json`, {
        description,
        amount,
        date,
      });
      dispatch({
        type: UPDATE_EXPENSE_SUCCESS,
        payload: { id, description, amount, date },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EXPENSE_ERROR,
        payload: { errorMessage: error.message },
      });
    }
  };

  const getExpenses = async () => {
    dispatch({ type: GET_EXPENSES_BEGIN });
    try {
      const response = await httpFetch.get('/expenses.json');
      const expensesList = [];
      for (const key in response.data) {
        const expenseObj = {
          id: key,
          description: response.data[key].description,
          date: new Date(response.data[key].date),
          amount: +response.data[key].amount,
        };
        expensesList.push(expenseObj);
      }
      dispatch({
        type: GET_EXPENSES_SUCCESS,
        payload: { expenses: expensesList },
      });
    } catch (error) {
      dispatch({
        type: GET_EXPENSES_ERROR,
        payload: { errorMessage: error.message },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addExpense,
        updateExpense,
        deleteExpense,
        getExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
