import Expense from '../data/Expense';
import { formatDate } from '../util/utils';

export default class ExpensesService {
  private baseUrl = 'https://react-native-course-aa925-default-rtdb.firebaseio.com/';

  async fetchExpenses(): Promise<Expense[]> {
    const expensesUrl = this.baseUrl + 'expenses.json';
    const response = await fetch(expensesUrl);
    if (response.ok) {
      const json = await response.json();
      const expenses = Object.entries(json).map(([id, expense]) =>
        Expense.fromJson({ id: id, ...(expense as object) })
      );
      return expenses;
    } else {
      console.log(response.status);
      throw Error('Error fetching data');
    }
  }

  async addExpense(expense: Expense): Promise<string> {
    const addExpenseUrl =
      this.baseUrl + 'expenses.json';
    const payload = expense.toJson();
    delete payload.id;
    const response = await fetch(addExpenseUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const json = await response.json();
      return json.name as string;
    } else {
      console.log(response.status);
      console.log(await response.json());
      throw Error('Failed to post expense');
    }
  }

  async editExpense(expenseId: string, data: {
    name: string,
    date: Date,
    value: number,
  }): Promise<void> {
    const editExpenseUrl = this.baseUrl + 'expenses/' + expenseId + '.json';
    const payload = { ...data, date: formatDate(data.date) };
    const response = await fetch(editExpenseUrl, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.log(await response.json());
      throw Error('Failed to update expense');
    }
  }

  async deleteExpense(expenseId: string) {
    const deleteExpenseUrl = this.baseUrl + 'expenses/' + expenseId + '.json';
    const response = await fetch(deleteExpenseUrl, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error(await response.json());
      throw Error('Failed to delete expense');
    }
  }
}
