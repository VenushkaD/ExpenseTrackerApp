import React, { useEffect } from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useAppContext } from '../context/appContext';
const AllExpenses = () => {
  const { allExpenses, getExpenses, isLoading, showAlert, errorMessage } =
    useAppContext();

  useEffect(() => {
    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!isLoading && showAlert) {
    return <ErrorOverlay errorMessage={errorMessage} />;
  }

  return (
    <ExpensesOutput
      expensesPeriod='Total'
      expenses={allExpenses}
      fallbackText='No registered expenses found'
    />
  );
};

export default AllExpenses;
