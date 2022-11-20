import { useContext } from 'react';
import { ExpensesContext, ExpensesDispatchContext } from './ExpensesContext';

export function useExpenses() {
  return useContext(ExpensesContext);
}

export function useExpensesDispatch() {
  return useContext(ExpensesDispatchContext);
}
