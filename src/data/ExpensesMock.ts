import Expense from './Expense';

const initialState = [
  new Expense('1', 'Burger', new Date(2022, 10, 17), 14.99),
  new Expense('2', 'Casino', new Date(2022, 10, 15), 200),
  new Expense('3', 'Bus', new Date(2022, 10, 14), 5.5),
  new Expense('4', 'Car Repair', new Date(2022, 10, 16), 80.35),
  new Expense('5', 'Hot Dog', new Date(2022, 10, 13), 2.99),
  new Expense('6', 'iPhone', new Date(2022, 10, 12), 1499),
  new Expense('7', 'A book', new Date(2022, 10, 1), 14.99),
];

export default initialState;
