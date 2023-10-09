import { ActivityIndicator, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import Home from "../screens/Home";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import OrderDelivarey from "../screens/OrderDelivarey";
import DelivareyFormerOrders from "../screens/DelivareyFormerOrders";
import AdressList from "../modals/AdressList";
import Dish from "../modals/Dish";
import Login from "../screens/Login";
import FoodFormerOrders from "../screens/FoodFormerOrders";
import Dishes from "../screens/Dishes";
import OrderDetails from "../modals/OrderDetails";
import Setting from "../screens/Setting";
import UpdateInfo from "../modals/UpdateInfo";
import UpdateAdress from "../modals/UpdateAdress";
import UpdatePassword from "../modals/UpdatePassword";
import AddDish from "../modals/AddDish";
import EditDish from "../modals/EditDish";
import Addsize from "../modals/Addsize";
import Editsize from "../modals/Editsize";
import { AuthContext } from "../context/AuthContext";


const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();
function Drawernavigator({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerPosition: 'right',
      }}>
      <Drawer.Screen name="Home" component={Home} options={{ title: "الرئيسية" }} />
      <Drawer.Screen name="OrderDelivarey" component={OrderDelivarey} options={{ title: "طلب توصيل جديد" }} />
      <Drawer.Screen name="DelivareyFormerOrders" component={DelivareyFormerOrders} options={{ title: "طلبات التوصيل السابقة" }} />
      <Drawer.Screen name="FoodFormerOrders" component={FoodFormerOrders} options={{ title: "طلبات المطاعم السابقة" }} />
      <Drawer.Screen name="Setting" component={Setting} options={{ title: "الاعدادات" }} />
      <Drawer.Screen name="Dishes" component={Dishes} options={{ title: "الأطباق" }} />
    </Drawer.Navigator>
  );
}

export default function Appwraper() {



  const { userToken } = useContext(AuthContext);


  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName='drawer'
        screenOptions={{
          headerShown: false,
        }}>
        {userToken !== null ? <>
          <RootStack.Group>
            <RootStack.Screen name="drawer" component={Drawernavigator} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'transparentModal' }}>
            <RootStack.Screen name="AdressList" component={AdressList} />
            <RootStack.Screen name="OrderDetails" component={OrderDetails} />
            <RootStack.Screen name="Dish" component={Dish} />
            <RootStack.Screen name="AddDish" component={AddDish} />
            <RootStack.Screen name="EditDish" component={EditDish} />
            <RootStack.Screen name="Addsize" component={Addsize} />
            <RootStack.Screen name="Editsize" component={Editsize} />
            <RootStack.Screen name="UpdateInfo" component={UpdateInfo} />
            <RootStack.Screen name="UpdateAdress" component={UpdateAdress} />
            <RootStack.Screen name="UpdatePassword" component={UpdatePassword} />
          </RootStack.Group>
        </> :
          <RootStack.Group>
            <RootStack.Screen name="Login" component={Login} />
          </RootStack.Group>}
      </RootStack.Navigator>

    </NavigationContainer >
  );
}
