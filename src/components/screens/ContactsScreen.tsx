import { Dialogs } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ContactsScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Contacts">,
};

export function ContactsScreen({ navigation }: ContactsScreenProps) {
    const [searchQuery, setSearchQuery] = React.useState("");
    
    const mockContacts = [
        { id: "1", name: "John Doe", number: "+1234567890" },
        { id: "2", name: "Jane Smith", number: "+1987654321" },
        { id: "3", name: "Bob Johnson", number: "+1122334455" },
    ];

    const filteredContacts = mockContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.number.includes(searchQuery)
    );

    return (
        <flexboxLayout style={styles.container}>
            <searchBar
                hint="Search contacts..."
                text={searchQuery}
                onTextChange={(args) => setSearchQuery(args.object.text)}
                className="mb-4"
            />
            
            <scrollView>
                {filteredContacts.map(contact => (
                    <gridLayout
                        key={contact.id}
                        className="p-4 border-b border-gray-200"
                        columns="auto,*,auto"
                        onTap={() => navigation.navigate("ContactDetails", { contactId: contact.id })}
                    >
                        <label
                            col={0}
                            className="w-10 h-10 rounded-full bg-blue-500 text-white text-center leading-10"
                        >
                            {contact.name[0]}
                        </label>
                        <stackLayout col={1} className="ml-4">
                            <label className="text-lg">{contact.name}</label>
                            <label className="text-sm text-gray-500">{contact.number}</label>
                        </stackLayout>
                        <button
                            col={2}
                            className="text-blue-500"
                            onTap={() => Dialogs.alert(`Calling ${contact.name}`)}
                        >
                            Call
                        </button>
                    </gridLayout>
                ))}
            </scrollView>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        padding: 16,
    },
});