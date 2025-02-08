import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { DialerScreen } from "./screens/DialerScreen";
import { CallHistoryScreen } from "./screens/CallHistoryScreen";
import { ContactsScreen } from "./screens/ContactsScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Dialer"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#2e6ddf",
                },
                headerTintColor: "#ffffff",
            }}
        >
            <StackNavigator.Screen
                name="Dialer"
                component={DialerScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="CallHistory"
                component={CallHistoryScreen}
            />
            <StackNavigator.Screen
                name="Contacts"
                component={ContactsScreen}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);