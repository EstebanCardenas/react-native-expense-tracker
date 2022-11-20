import { formatDate } from '../util/utils';

export default class Expense {
  id: string;
  name: string;
  date: Date;
  value: number;

  constructor(
    id: string,
    name: string,
    date: Date,
    value: number
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.value = value;
  }

  static fromJson(json: any): Expense {
    const dateString = json.date as string;
    const dateValues: number[] = dateString.split('-').map(v => {
      return +v;
    });

    return new Expense(
      json.id,
      json.name,
      new Date(dateValues[0], dateValues[1] - 1, dateValues[2]),
      json.value,
    );
  }

  toJson(): {
    id?: string,
    name: string,
    date: string,
    value: number,
  } {
    return {
      id: this.id,
      name: this.name,
      date: formatDate(this.date),
      value: this.value,
    };
  }
}
