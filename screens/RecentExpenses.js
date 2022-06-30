import React from 'react';
import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';
import { useAppContext } from '../context/appContext';
const RecentExpenses = () => {
  const { allExpenses } = useAppContext();

  const recentExpenses = allExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    return expense.date >= date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expensesPeriod='Last 7 Days'
      expenses={recentExpenses}
      fallbackText='No expenses registered for the last 7 days'
    />
  );
};

export default RecentExpenses;
