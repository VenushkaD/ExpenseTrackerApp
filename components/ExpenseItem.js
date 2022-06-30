import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { getFormattedDate } from '../util/date';

const ExpenseItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();

  const pressHandle = () => {
    navigation.navigate('ManageExpenses', {
      expenseId: id,
    });
  };

  return (
    <Pressable
      onPress={pressHandle}
      android_ripple={{ color: GlobalStyles.colors.primary200 }}
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description.toUpperCase()}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    borderRadius: 6,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
