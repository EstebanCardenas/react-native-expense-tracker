import React, { createContext, useReducer } from 'react';
import Expense from '../../data/Expense';
import { ExpensesActionType, expensesReducer } from './ExpensesReducer';

export type ExpensesState = {
  expenses: Expense[];
  isLoadingExpenses: boolean;
}

export const ExpensesContext = createContext<ExpensesState>({
  expenses: [],
  isLoadingExpenses: true,
});
export const ExpensesDispatchContext =
  createContext<React.Dispatch<ExpensesActionType>>((_) => { });

type ExpensesProviderProps = {
  children: JSX.Element,
}

export default function ExpensesProvider({
  children,
}: ExpensesProviderProps): JSX.Element {
  const [expenses, dispatch] =
    useReducer(expensesReducer, {
      expenses: [],
      isLoadingExpenses: true,
    });

  return <ExpensesContext.Provider value={expenses}>
    <ExpensesDispatchContext.Provider value={dispatch}>
      {children}
    </ExpensesDispatchContext.Provider>
  </ExpensesContext.Provider>;
}
