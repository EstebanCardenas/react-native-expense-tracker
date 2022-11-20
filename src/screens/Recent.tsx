import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList, TabParamList } from '../App';
import ExpensesSummary from '../components/ExpensesSummary';
import ExpenseCard from '../components/ExpenseCard';
import SizedBox from '../constants/Layout';
import { useExpenses } from '../state/context/ExpensesHooks';
import Expense from '../data/Expense';
import colors from '../constants/Colors';
import { ExpensesState } from '../state/context/ExpensesContext';

type RecentScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Recent'>,
  NativeStackScreenProps<StackParamList>
>

function RecentScreen({
  navigation,
}: RecentScreenProps): JSX.Element {
  const expensesState: ExpensesState = useExpenses();
  const filteredExpenses: Expense[] = useMemo(
    () => {
      let sevenDaysAgoDate = new Date();
      sevenDaysAgoDate.setDate(
        sevenDaysAgoDate.getDate() - 7,
      );
      return expensesState.expenses.filter(e => e.date >= sevenDaysAgoDate);
    },
    [expensesState],
  );
  const expensesSum = useMemo(
    () => filteredExpenses.reduce(
      (acc, curr) => acc + curr.value,
      0
    ),
    [filteredExpenses],
  );

  function renderContent(): JSX.Element {
    if (filteredExpenses.length === 0) {
      return <Text style={styles.emptyText}>
        No expenses registered for the last 7 days.
      </Text>;
    } else {
      return <FlatList
        data={filteredExpenses}
        renderItem={({ item }) => <ExpenseCard
          onPressed={() => {
            navigation.push('ManageExpense', {
              type: 'edit',
              expenseId: item.id,
            });
          }}
          cost={item.value}
          date={item.date}
          expenseName={item.name}
        />}
        keyExtractor={e => e.id}
        ItemSeparatorComponent={() => <SizedBox height={16} />}
        ListFooterComponent={() => <SizedBox height={16} />}
      />;
    }
  }

  if (expensesState.isLoadingExpenses) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>;
  }

  return <View style={styles.container}>
    <ExpensesSummary
      label="Last 7 days"
      sum={expensesSum}
    />
    <SizedBox height={8} />
    {renderContent()}
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.primary50,
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RecentScreen;
