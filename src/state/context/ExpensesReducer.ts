import Expense from '../../data/Expense';
import { ExpensesState } from './ExpensesContext';

export type ExpensesActionType =
  | { type: 'addExpense', expense: Expense }
  | { type: 'setExpenses', expenses: Expense[] }
  | { type: 'removeExpense', expenseId: string }
  | {
    type: 'updateExpense', expenseId: string, data: {
      name?: string,
      date?: Date,
      value?: number,
    }
  }

export function expensesReducer(
  state: ExpensesState,
  action: ExpensesActionType
): ExpensesState {
  switch (action.type) {
    case 'setExpenses': {
      return {
        expenses: action.expenses,
        isLoadingExpenses: false,
      };
    }
    case 'addExpense': {
      const expenses = state.expenses;
      const isExpenseInState =
        expenses.find(e => e.id === action.expense.id) != null;
      if (isExpenseInState) {
        return state;
      } else {
        return {
          expenses: [...expenses, action.expense],
          isLoadingExpenses: false,
        };
      }
    }
    case 'removeExpense': {
      return {
        expenses: state.expenses.filter(e => e.id !== action.expenseId),
        isLoadingExpenses: false,
      };
    }
    case 'updateExpense': {
      const expenses = state.expenses;
      const expenseIdx = expenses.findIndex(e => e.id === action.expenseId);
      if (expenseIdx !== -1) {
        const expense = expenses[expenseIdx];
        const updatingPayload = {
          id: expense.id,
          name: action.data.name ?? expense.name,
          date: action.data.date ?? expense.date,
          value: action.data.value ?? expense.value,
        };
        const updatedExpense = { ...updatingPayload };
        const newList = [...expenses];
        newList[expenseIdx] = new Expense(
          updatedExpense.id,
          updatedExpense.name,
          updatedExpense.date,
          updatedExpense.value
        );
        return {
          expenses: newList,
          isLoadingExpenses: false,
        };
      }
      return state;
    }
  }
}
