import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, textInputConfig, invalid }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.labelText, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          invalid && styles.invalidInput,
        ]}
        {...textInputConfig}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  labelText: {
    color: GlobalStyles.colors.primary100,
    marginBottom: 3,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 4,
    fontSize: 18,
    borderRadius: 6,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
