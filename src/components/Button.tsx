import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';

type ButtonProps = {
  label: string;
  onPressed: () => void;
  style?: object;
}

function Button({
  label,
  onPressed,
  style,
}: ButtonProps): JSX.Element {
  return <TouchableOpacity
    onPress={onPressed}
    style={[styles.container, style]}
  >
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary500,
  },
  text: {
    color: colors.primary50,
  },
});

export default Button;
