import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpense from './screens/ManageExpense';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { GlobalStyles } from './constants/styles';
import IconButton from './components/ui/IconButton';
import { AppProvider } from './context/appContext';
const TabsContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpenses');
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name='ExpensesOverview'
              component={TabsContainer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ManageExpenses'
              component={ManageExpense}
              options={
                {
                  // presentation: 'modal',
                }
              }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
