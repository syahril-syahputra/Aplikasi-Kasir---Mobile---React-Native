import React, { createContext, useReducer, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/screen/Login'
import Home from './src/screen/Home'
import Tester from './src/screen/Tester'
import FireStore from './src/screen/FireStore'
import DataCustomer from './src/screen/DataCustomer'
import AddBarang from './src/component/product/AddBarang'

const initState = {
  isLogin: false,
  user: null
};


export const dataContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {isLogin:true, user : action.data};
    case 'logout':
      return {isLogin:false, user : null};
   
    default:
      return state;
  }
}

const stack = createStackNavigator()
const App = () => {



  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <NavigationContainer>
      <dataContext.Provider value={[state, dispatch]}>
        <stack.Navigator screenOptions={{ headerShown: false }}>
          {
            state.isLogin ?
              <stack.Screen name="home" component={Home} />
              :
              <stack.Screen name="login" component={Login} />
          }

        </stack.Navigator>
      </dataContext.Provider>

    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})
