import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = ({ item }) => {
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      style={styles.container}
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
