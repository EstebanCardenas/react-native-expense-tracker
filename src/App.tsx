import React, { useEffect } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import RecentScreen from './screens/Recent';
import AllScreen from './screens/All';
import { Alert, Platform, StyleSheet } from 'react-native';
import colors from './constants/Colors';
import IconButton from './components/IconButton';
import ExpensesProvider from './state/context/ExpensesContext';
import ManageExpenseScreen from './screens/ManageExpense';
import ExpensesService from './service/ExpensesService';
import { useExpensesDispatch } from './state/context/ExpensesHooks';

type ManageExpenseMode =
  | { type: 'add' }
  | { type: 'edit', expenseId: string };

export type StackParamList = {
  ExpensesOverview: NavigatorScreenParams<TabParamList>;
  ManageExpense: ManageExpenseMode;
}

export type TabParamList = {
  Recent: undefined;
  All: undefined;
}

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function App() {
  return (
    <ExpensesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            options={{
              headerShown: false,
            }}
            component={ExpensesOverview} />
          <Stack.Screen
            name="ManageExpense"
            options={{
              title: 'Edit Expense',
              presentation: 'modal',
              animation: Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
              headerStyle: {
                backgroundColor: colors.primary500,
              },
              headerTintColor: colors.primary50,
              headerBackVisible: false,
            }}
            component={ManageExpenseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesProvider>
  );
}

type ExpensesOverviewProps = NativeStackScreenProps<StackParamList, 'ExpensesOverview'>;

function ExpensesOverview({
  navigation,
}: ExpensesOverviewProps): JSX.Element {
  const expensesDispatch = useExpensesDispatch();

  useEffect(() => {
    const expensesService = new ExpensesService();
    expensesService.fetchExpenses()
      .then(expenses => {
        expensesDispatch({
          type: 'setExpenses',
          expenses: expenses,
        });
      })
      .catch(reason => {
        console.log(`Error fetching expenses: ${reason}`);
        expensesDispatch({
          type: 'setExpenses',
          expenses: [],
        });
        Alert.alert('Failed to load expenses');
      });
  }, [expensesDispatch]);

  return <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary500,
      },
      headerTintColor: 'white',
      tabBarActiveTintColor: colors.accent500,
      tabBarStyle: {
        backgroundColor: colors.primary500,
      },
      headerRight: () => <IconButton
        onPressed={() => {
          navigation.push('ManageExpense', {
            type: 'add',
          });
        }}
        iconName="add" />,
    }}
    sceneContainerStyle={styles.scene}
  >
    <Tab.Screen
      name="Recent"
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="timer-sand"
            color={color}
            size={size} />
        ),
      }}
      component={RecentScreen} />
    <Tab.Screen
      name="All"
      options={{
        title: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name="calendar"
            color={color}
            size={size} />
        ),
      }}
      component={AllScreen} />
  </Tab.Navigator>;
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: colors.primary700,
  },
});

export default App;
