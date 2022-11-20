import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import colors from '../constants/Colors';

type InputProps = {
  label: string;
  textInputConfig: TextInputProps;
}

function Input({
  label,
  textInputConfig,
}: InputProps): JSX.Element {
  return <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, textInputConfig.multiline && styles.inputMultiline]}
      {...textInputConfig}
      cursorColor={colors.primary500}
    />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.primary100,
    color: colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default Input;
