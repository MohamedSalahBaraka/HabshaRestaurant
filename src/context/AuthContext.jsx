import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
import * as SecureStore from "expo-secure-store";
import { BaseUrl } from "../config";
import axios from "axios";
import * as Notifications from "expo-notifications";
import { useNotification } from "../../useNotifcation";
import { Dimensions } from "react-native";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
async function deleteItem(key) {
  await SecureStore.deleteItemAsync(key);
}

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [expoToken, setexpoToken] = useState(null);
  const [phonerespoce, setphonerespoce] = useState(null);
  const [typeResponce, settypeResponce] = useState(null);
  const [passwordresponce, setpasswordresponce] = useState(null);
  const [Colors, setColors] = useState({
    primary: '#FFCA3A',
    secondary: '#F97068',
    tertiary: '#010400',
    fourth: '#FFFBFC',
  });
  const [Dimention, setDimention] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotification();

  const login = (phone, password, setIsLoading) => {
    setIsLoading(true)
    let type = 'restaurant';
    axios
      .post(`${BaseUrl}login`, {
        phone,
        password,
        type,
      })
      .then((response) => {
        setUserToken(response.data.token);
        save("userToken", response.data.token);
        setUser(response.data.user);
        save("user", response.data.user);
        console.log(response.data.token);
        const config = {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        let data = new FormData();
        data.append("expo_token", expoToken);
        axios
          .post(`${BaseUrl}exponent/devices/subscribe`, data, config)
          .then((response) => {
            console.log("LOGIN", response.data);
            setIsLoading(false)
          })
          .catch((e) => {
            console.log(e);
            console.log("LOGIN", e.response.data);
            setIsLoading(false)
          });
      })
      .catch((e) => {
        console.log(e);
        console.log("LOGIN", e.response.data);
        if (e.response.status === 422) {
          setphonerespoce(e.response.data.phone);
          settypeResponce(e.response.data.type);
          setpasswordresponce(e.response.data.password);
        }
        setIsLoading(false)
      });
  };
  const logout = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    let data = new FormData();
    data.append("expo_token", expoToken);
    const bodyParameters = {
      key: "value",
    };
    await axios
      .post(`${BaseUrl}exponent/devices/unsubscribe`, data, config)
      .then(async (response) => {
        await axios
          .post(`${BaseUrl}logout`, bodyParameters, config)
          .then(async (response) => {
            setUserToken(null);
            setUser(null);
            await deleteItem("userToken");
            await deleteItem("user");
          })
          .catch(async (e) => {
            console.log(e);
            setUserToken(null);
            setUser(null);
            await deleteItem("userToken");
            await deleteItem("user");
          });
      })
      .catch(async (e) => {
        console.log(e);
        setUserToken(null);
        setUser(null);
        await deleteItem("userToken");
        await deleteItem("user");
        console.log("LOGOUT", e.response.data);
      });
  };

  const IsLoggedIn = async () => {
    try {
      let result = await SecureStore.getItemAsync("userToken");
      if (result) {
        setUserToken(result);
      } else {
        setUserToken(null);
      }
      let user = await SecureStore.getItemAsync("user");
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    IsLoggedIn();
    async function getToken() {
      let token = await registerForPushNotificationsAsync();
      setexpoToken(token);
      console.log(token);
    }
    getToken();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );


    return () => {
      if (responseListener) {
        Notifications.removeNotificationSubscription(responseListener);
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        Colors,
        setColors,
        Dimention,
        expoToken,
        userToken,
        typeResponce,
        phonerespoce,
        passwordresponce,
        save,
        setUserToken,
        setUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
