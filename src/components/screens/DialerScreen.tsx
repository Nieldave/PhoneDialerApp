import { Dialogs, Utils } from '@nativescript/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type DialerScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Dialer">,
};

export function DialerScreen({ navigation }: DialerScreenProps) {
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const addDigit = (digit: string) => {
        setPhoneNumber(prev => prev + digit);
    };

    const deleteDigit = () => {
        setPhoneNumber(prev => prev.slice(0, -1));
    };

    const makeCall = () => {
        if (phoneNumber) {
            Utils.openUrl(`tel:${phoneNumber}`);
        } else {
            Dialogs.alert("Please enter a phone number");
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <gridLayout rows="auto,*,auto,auto" className={isDarkMode ? "dark" : ""}>
            
            {/* Header Section */}
            <gridLayout row={0} columns="auto,*,auto" className="p-4">
                <button col={0} className="icon-button" onTap={toggleDarkMode}>
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <label col={1} className="text-2xl text-center dark:text-white text-black">
                    Phone
                </label>
                <button col={2} className="icon-button"
                    onTap={() =>
                        Dialogs.action({
                            message: "Options",
                            cancelButtonText: "Cancel",
                            actions: ["Save Contact", "Block Number", "Call History", "Contacts"]
                        }).then(result => {
                            switch (result) {
                                case "Call History":
                                    navigation.navigate("CallHistory");
                                    break;
                                case "Contacts":
                                    navigation.navigate("Contacts");
                                    break;
                                case "Save Contact":
                                    Dialogs.prompt({
                                        title: "Save Contact",
                                        message: "Enter contact name",
                                        okButtonText: "Save",
                                        cancelButtonText: "Cancel"
                                    });
                                    break;
                                case "Block Number":
                                    Dialogs.alert("Number blocked");
                                    break;
                            }
                        })
                    }>
                    ⋮
                </button>
            </gridLayout>

            {/* Number Display (Positioned Just Above Dialpad) */}
            <stackLayout row={2} className="p-4 mt-auto mb-10 flex items-center justify-center">
                <label className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {phoneNumber.length > 0 ? phoneNumber : ""}
                </label>
            </stackLayout>

            {/* Dialpad (Pushed Towards Bottom) */}
            <gridLayout row={2} rows="auto,auto,auto,auto" columns="*,*,*" className="p-4 mt-24">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit, index) => (
                    <button
                        key={digit}
                        row={Math.floor(index / 3)}
                        col={index % 3}
                        className="dialer-button"
                        onTap={() => addDigit(digit)}
                    >
                        {digit}
                    </button>
                ))}
            </gridLayout>

            {/* Call & Delete Buttons (More Spacing & Centered) */}
            <gridLayout row={3} columns="*,auto,*" className="mt-6 mb-6">
                {/* Empty space for alignment */}
                <stackLayout col={0} />

                {/* Call Button (Centered) */}
                <stackLayout col={1} className="flex items-center justify-center">
                    <button className="call-button" onTap={makeCall}>
                        📞
                    </button>
                </stackLayout>

                {phoneNumber.length > 0 && (
                    <stackLayout col={2} className="flex items-center justify-center">
                        <button className="delete-button" onTap={deleteDigit}>
                            ⌫
                        </button>
                    </stackLayout>
                )}
            </gridLayout>
        </gridLayout>
    );
}
