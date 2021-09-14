import { SearchbarChangeEventDetail } from "@ionic/core";
import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonLabel,
    IonSearchbar,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import { StrippedEvent } from "../types/Event";

export interface SearchBarProps {
    onSearch: (value: string) => any;
}

function SearchBar() {
    const [value, setValue] = useState("");

    function changeSearchText(event: CustomEvent<SearchbarChangeEventDetail>) {
        const text = event.detail.value as string;
        setValue(text);
    }

    return (
        <IonSearchbar
            mode="ios"
            value={value}
            onIonChange={changeSearchText}
            clearIcon={closeCircleOutline}
        ></IonSearchbar>
    );
}

export default SearchBar;
