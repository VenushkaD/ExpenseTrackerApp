import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, Button } from 'react-native';
import Input from './Input';
import CustomButton from '../ui/CustomButton';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const ExpenseForm = ({ isEditing, onCancel, onSubmit, defaultValues }) => {
  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (type, enteredValue) => {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        [type]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      description: inputs.description.value,
      date: new Date(inputs.date.value),
      amount: +inputs.amount.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { ...curInputs.amount, isValid: amountIsValid },
          date: { ...curInputs.date, isValid: dateIsValid },
          description: {
            ...curInputs.description,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }
    onSubmit(expenseData);
  };

  const DatePicker = () => {
    return (
      <DateTimePicker
        value={
          new Date(inputs.date.value).toString() === 'Invalid Date'
            ? new Date()
            : new Date(inputs.date.value)
        }
        maximumDate={new Date()}
        disabled={true}
        mode='date'
        onChange={(event) => {
          setShowDatePicker(false);
          if (event.type === 'set') {
            handleInputChange(
              'date',
              getFormattedDate(new Date(event.nativeEvent.timestamp))
            );
          }
        }}
      />
    );
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <Input
        label='Amount'
        invalid={!inputs.amount.isValid}
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: (text) => handleInputChange('amount', text),
          value: inputs.amount.value,
        }}
      />
      <Input
        label='Date'
        invalid={!inputs.date.isValid}
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: (text) => handleInputChange('date', text),
          // editable: false,
          value: inputs.date.value === '' ? '' : inputs.date.value,
        }}
      />
      <Button title='Select Date' onPress={() => setShowDatePicker(true)} />
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (text) => handleInputChange('description', text),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <CustomButton mode={'flat'} onPress={onCancel} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={submitHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </CustomButton>
      </View>
      {showDatePicker && <DatePicker />}
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
