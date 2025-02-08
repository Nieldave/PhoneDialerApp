import { Dialogs } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type CallHistoryScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "CallHistory">,
};

export function CallHistoryScreen({ navigation }: CallHistoryScreenProps) {
    const mockCallHistory = [
        { number: "+1234567890", type: "outgoing", date: "2024-03-20 14:30" },
        { number: "+1987654321", type: "incoming", date: "2024-03-20 13:15" },
        { number: "+1122334455", type: "missed", date: "2024-03-20 12:00" },
    ];

    return (
        <scrollView style={styles.container}>
            <label className="text-xl font-bold mb-4">Recent Calls</label>
            {mockCallHistory.map((call, index) => (
                <gridLayout
                    key={index}
                    className="p-4 border-b border-gray-200"
                    columns="auto,*,auto"
                >
                    <label
                        col={0}
                        className={`mr-2 ${
                            call.type === 'missed' ? 'text-red-500' :
                            call.type === 'incoming' ? 'text-green-500' :
                            'text-blue-500'
                        }`}
                    >
                        {call.type === 'missed' ? '✗' :
                         call.type === 'incoming' ? '↓' : '↑'}
                    </label>
                    <stackLayout col={1}>
                        <label className="text-lg">{call.number}</label>
                        <label className="text-sm text-gray-500">{call.date}</label>
                    </stackLayout>
                    <button
                        col={2}
                        className="text-blue-500"
                        onTap={() => Dialogs.alert(`Calling ${call.number}`)}
                    >
                        Call
                    </button>
                </gridLayout>
            ))}
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 16,
    },
});