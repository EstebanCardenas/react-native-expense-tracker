import React, { useEffect, useMemo } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, View } from 'react-native';

import { StackParamList } from '../App';
import colors from '../constants/Colors';
import SizedBox from '../constants/Layout';
import IconButton from '../components/IconButton';
import { useExpenses, useExpensesDispatch } from '../state/context/ExpensesHooks';
import ExpenseForm, { FormInput, FormOutput } from '../components/ExpenseForm';
import Expense from '../data/Expense';
import ExpensesService from '../service/ExpensesService';
import { generateRandomId } from '../util/utils';
import { ExpensesState } from '../state/context/ExpensesContext';

type ManageExpenseScreenProps = NativeStackScreenProps<StackParamList, 'ManageExpense'>;

function ManageExpenseScreen({
  navigation,
  route,
}: ManageExpenseScreenProps): JSX.Element {
  const expensesDispatch = useExpensesDispatch();
  const expensesState: ExpensesState = useExpenses();
  const displayType = route.params.type;
  const expenseId =
    route.params.type === 'edit' && route.params.expenseId;
  const editedExpense: Expense | undefined = useMemo(
    () => {
      return expensesState.expenses.find(e => e.id === expenseId);
    },
    [expenseId, expensesState]
  );
  const expensesService = new ExpensesService();

  function getFormInput(): FormInput | undefined {
    if (editedExpense != null) {
      return {
        amount: editedExpense.value,
        date: editedExpense.date,
        description: editedExpense.name,
      };
    }
  }

  async function onUpdate(input: FormOutput) {
    if (expenseId !== false) {
      try {
        const dateFields = input.date.split('-').map(f => {
          return parseInt(f, 10);
        });
        const updatingData = {
          name: input.description.trim(),
          date: new Date(dateFields[0], dateFields[1] - 1, dateFields[2]),
          value: +input.amount,
        };
        await expensesService.editExpense(expenseId, updatingData);
        expensesDispatch({
          type: 'updateExpense',
          expenseId: expenseId,
          data: updatingData,
        });
      } catch {
        Alert.alert('Failed to update expense');
      }
    }
    navigation.pop();
  }

  async function onAdd(input: FormOutput) {
    try {
      const dateFields = input.date.split('-').map(f => {
        return parseInt(f, 10);
      });
      const newExpense = new Expense(
        generateRandomId(),
        input.description,
        new Date(dateFields[0], dateFields[1] - 1, dateFields[2]),
        +input.amount,
      );
      const id = await expensesService.addExpense(newExpense);
      newExpense.id = id;
      expensesDispatch({
        type: 'addExpense',
        expense: newExpense,
      });
      navigation.pop();
    } catch (e) {
      console.log(e);
      Alert.alert('Failed to add expense');
    }
  }

  async function onDelete(id: string) {
    try {
      await expensesService.deleteExpense(id);
      expensesDispatch({
        type: 'removeExpense',
        expenseId: id,
      });
      navigation.pop();
    } catch {
      Alert.alert('Failed to delete expense');
    }
  }

  useEffect(() => {
    const mode = route.params;
    if (mode.type === 'add') {
      navigation.setOptions({
        title: 'Add Expense',
      });
    }
  }, [route.params, navigation]);

  function renderFooterContent(): JSX.Element | undefined {
    const mode = route.params;
    switch (mode.type) {
      case 'edit':
        return <>
          <SizedBox height={16} />
          <View style={styles.divider} />
          <SizedBox height={16} />
          <IconButton
            onPressed={() => {
              onDelete(mode.expenseId);
            }}
            iconName="trash"
            color={colors.error500}
            size={32} />
        </>;
    }
  }

  return <View style={styles.container}>
    <SizedBox height={16} />
    <ExpenseForm
      style={styles.form}
      initialState={getFormInput()}
      submitLabel={displayType === 'edit' ? 'Update' : 'Add'}
      onCancel={() => {
        navigation.pop();
      }}
      onSubmitted={displayType === 'edit' ? onUpdate : onAdd}
    />
    {renderFooterContent()}
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.primary700,
  },
  form: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
  },
  divider: {
    height: 2,
    backgroundColor: colors.primary200,
    alignSelf: 'stretch',
    marginHorizontal: 24,
  },
});

export default ManageExpenseScreen;
