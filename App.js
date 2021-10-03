import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect, Provider } from 'react-redux';
import Constants from 'expo-constants';
import store from './redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Decks from './components/Decks';
import Loading from './components/Loading';
import { _fetchDeckResults } from './utils/API';
import { receiveDecks } from './redux/actions';
import AddDeck from './components/AddDeck';
import DeckDetail from './components/DeckDetail';
import AddQuestion from './components/AddQuestion';
import StartQuiz from './components/StartQuiz';
import { setLocalNotification } from './utils/helpers';
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
class AppMainClass extends Component {
  state = { ready: false }
  componentDidMount() {
    const { dispatch } = this.props;
    setLocalNotification()
    _fetchDeckResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState({ ready: true }))
  }
  render() {
    const { ready } = this.state;
    if (ready === false) {
      return (
        <Loading />
      )
    }
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#02351a', height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={'#02351a'} barStyle='light-content' />
        </View>
        <NavigationContainer>
          <Stack.Navigator screenOptions={({ route }) => ({ header: () => null, })}>
            <Stack.Screen name='Home'>
              {() => (<Tabs.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Decks') {
                      iconName = focused
                        ? 'apps'
                        : 'apps-outline';
                    } else if (route.name === 'AddDeck') {
                      iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#02351a',
                  tabBarInactiveTintColor: 'gray',
                  header: () => null,
                })}
              >
                <Tabs.Screen name='Decks' component={Decks} />
                <Tabs.Screen name='AddDeck' options={{ title: 'Add Deck' }} component={AddDeck} />
              </Tabs.Navigator>)}
            </Stack.Screen>
            <Stack.Screen name='DeckDetail' options={{ title: 'Deck Detail' }}>
              {({ navigation }) => <DeckDetail navigation={navigation} />}
            </Stack.Screen>
            <Stack.Screen name='AddQuestion' options={{ title: 'Add Question' }}>
              {({ navigation }) => <AddQuestion navigation={navigation} />}
            </Stack.Screen>
            <Stack.Screen name='StartQuiz' options={{ title: 'Start Quiz' }}>
              {({ navigation }) => <StartQuiz navigation={navigation} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
const AppMain = connect()(AppMainClass);
function App() {
  return (
    <Provider store={store}>
      <AppMain />
    </Provider>
  )
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
