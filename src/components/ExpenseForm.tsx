import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/Colors';
import SizedBox from '../constants/Layout';
import { formatDate } from '../util/utils';
import Button from './Button';

import Input from './Input';

export type FormOutput = {
  amount: string;
  date: string;
  description: string;
}

export type FormInput = {
  amount: number;
  date: Date;
  description: string;
}

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmitted: (input: FormOutput) => void;
  initialState?: FormInput;
  submitLabel: string;
  style?: object;
}

function ExpenseForm({
  style,
  onCancel,
  onSubmitted,
  submitLabel,
  initialState,
}: ExpenseFormProps): JSX.Element {
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function onAmountChanged(text: string) {
    if (text.length > 0) {
      setAmount(text.replace(/[^0-9.]/g, ''));
    } else {
      setAmount('');
    }
  }
  function onDateChanged(text: string) {
    if (text.length > 0) {
      setDate(text.replace(/[^0-9-]/g, ''));
    } else {
      setDate('');
    }
  }

  function onDescriptionChanged(text: string) {
    setDescription(text);
  }

  function submissionHandler() {
    const amountValue = parseFloat(amount);
    const isAmountValid =
      !isNaN(amountValue)
      && amountValue > 0;
    const dateValue = new Date(date);
    const isDateValid =
      dateValue.toString() !== 'Invalid Date'
      && dateValue <= new Date();
    const isDescriptionValid = description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      let message = 'Invalid ';
      if (!isAmountValid) {
        message += 'Amount';
      } else if (!isDateValid) {
        message += 'Date';
      } else {
        message += 'Description';
      }
      Alert.alert(message, 'Please check your input value.');
    } else {
      onSubmitted({
        amount: amount,
        date: date,
        description: description,
      });
    }
  }

  useEffect(() => {
    if (initialState != null) {
      setAmount(initialState.amount.toString());
      setDate(formatDate(initialState.date));
      setDescription(initialState.description);
    }
  }, [initialState]);

  return <View style={style}>
    <Text style={styles.title}>
      Your Expense
    </Text>
    <SizedBox height={8} />
    <Input
      label="Amount"
      textInputConfig={{
        value: amount,
        keyboardType: 'decimal-pad',
        onChangeText: onAmountChanged,
      }}
    />
    <Input
      label="Date"
      textInputConfig={{
        value: date,
        keyboardType: 'decimal-pad',
        placeholder: 'YYYY-MM-DD',
        maxLength: 10,
        autoCorrect: false,
        onChangeText: onDateChanged,
      }}
    />
    <Input
      label="Description"
      textInputConfig={{
        value: description,
        multiline: true,
        onChangeText: onDescriptionChanged,
      }}
    />
    <SizedBox height={16} />
    <View style={styles.buttonsContainer}>
      <Button
        label="Cancel"
        onPressed={onCancel}
        style={styles.cancelButton}
      />
      <SizedBox width={16} />
      <Button
        label={submitLabel}
        onPressed={submissionHandler}
        style={styles.submitButton}
      />
    </View>
  </View>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    paddingVertical: 8,
    minWidth: 120,
    backgroundColor: colors.primary500,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
  cancelButton: {
    paddingVertical: 8,
    minWidth: 100,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ExpenseForm;
