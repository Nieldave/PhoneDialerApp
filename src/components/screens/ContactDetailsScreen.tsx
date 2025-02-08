import { Dialogs } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { RouteProp } from '@react-navigation/core';
import { MainStackParamList } from "../../NavigationParamList";

type ContactDetailsScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "ContactDetails">,
    route: RouteProp<MainStackParamList, "ContactDetails">,
};

export function ContactDetailsScreen({ navigation, route }: ContactDetailsScreenProps) {
    const contact = {
        id: route.params.contactId,
        name: "John Doe",
        number: "+1234567890",
        email: "john@example.com",
    };

    return (
        <flexboxLayout style={styles.container}>
            <label
                className="w-20 h-20 rounded-full bg-blue-500 text-white text-center text-3xl"
                style={{ lineHeight: 80 }}
            >
                {contact.name[0]}
            </label>
            
            <label className="text-2xl font-bold mt-4">{contact.name}</label>
            
            <gridLayout rows="auto,auto" columns="*,auto" className="w-full mt-8">
                <label row={0} col={0} className="text-lg">{contact.number}</label>
                <button
                    row={0}
                    col={1}
                    className="text-blue-500"
                    onTap={() => Dialogs.alert(`Calling ${contact.name}`)}
                >
                    Call
                </button>
                
                <label row={1} col={0} className="text-lg mt-4">{contact.email}</label>
                <button
                    row={1}
                    col={1}
                    className="text-blue-500 mt-4"
                    onTap={() => Dialogs.alert(`Sending email to ${contact.email}`)}
                >
                    Email
                </button>
            </gridLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
    },
});