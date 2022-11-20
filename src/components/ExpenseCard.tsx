import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';
import SizedBox from '../constants/Layout';
import { formatDate } from '../util/utils';

type ExpenseCardProps = {
  expenseName: string;
  date: Date;
  cost: number;
  onPressed: () => void;
}

function ExpenseCard({
  expenseName,
  date,
  cost,
  onPressed,
}: ExpenseCardProps): JSX.Element {
  const formattedDate = formatDate(date);

  return <TouchableOpacity style={styles.container} onPress={onPressed}>
    <View style={styles.column}>
      <Text style={styles.nameText}>{expenseName}</Text>
      <SizedBox height={4} />
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
    <View style={styles.costContainer}>
      <Text style={styles.costText}>{cost}</Text>
    </View>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primary50,
  },
  dateText: {
    color: colors.primary50,
    fontWeight: 'normal',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  costText: {
    fontWeight: 'bold',
    color: colors.primary500,
  },
  costContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 74,
  },
});

export default ExpenseCard;
