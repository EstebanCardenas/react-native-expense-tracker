import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/Colors';

const dollarUSLocal = Intl.NumberFormat('en-US');

type ExpensesSummaryProps = {
  label: string;
  sum: number;
}

function ExpensesSummary({
  label,
  sum,
}: ExpensesSummaryProps): JSX.Element {
  return <View style={styles.container}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.sumText}>${dollarUSLocal.format(sum)}</Text>
  </View>;
}

const styles = StyleSheet.create({
  labelText: {
    color: colors.primary400,
    fontSize: 12,
  },
  sumText: {
    color: colors.primary500,
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    backgroundColor: colors.primary50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
});

export default ExpensesSummary;
