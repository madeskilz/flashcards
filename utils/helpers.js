import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
export const NOTIFICATION_KEY = 'flashcards:notifications'

export function clearLocalNotifications() {
    AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync());
}
export function createNotification() {
    return {
        title: 'Daily Study',
        body: '** Don\'t forget to study your Flashcards today!',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data) => {
        console.log(data);
        if (data) {
            Notifications.getPermissionsAsync().then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync();
                    Notifications.scheduleNotificationAsync({
                        content: createNotification(),
                        trigger: {
                            minute: 0,
                            hour: 20,
                            repeats: true,
                        }
                    })
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                }
            })
        }
    })
}