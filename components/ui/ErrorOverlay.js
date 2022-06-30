import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
const ErrorOverlay = ({ errorMessage }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
