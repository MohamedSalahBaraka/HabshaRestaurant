import * as Device from "expo-device";
import { Platform } from "expo-modules-core";
import * as Notifications from "expo-notifications";
export const useNotification = () => {
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '1c6f2425-6509-45dc-9e9c-276d6645db43' })).data;;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  };

  const handleNotification = (notification) => {
  }
  const handleNotificationResponse = (response) => {

  }

  return { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse };
}