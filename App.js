import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './product/productList';
import ProductDetails from './product/productDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products Page" component={ProductList} options={{ headerShown: true }} />
        <Stack.Screen name="Product Details" component={ProductDetails} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}