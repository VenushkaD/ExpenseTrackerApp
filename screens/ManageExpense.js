import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { useAppContext } from '../context/appContext';

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const {
    deleteExpense,
    addExpense,
    updateExpense,
    allExpenses,
    isLoading,
    showAlert,
    errorMessage,
  } = useAppContext();

  const selectedExpense = allExpenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (inputData) => {
    if (isEditing) {
      updateExpense({ ...inputData, id: editedExpenseId });
    } else {
      addExpense(inputData);
    }
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!isLoading && showAlert) {
    return <ErrorOverlay errorMessage={errorMessage} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
