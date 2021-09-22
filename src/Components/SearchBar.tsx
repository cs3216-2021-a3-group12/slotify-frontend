import { SearchbarChangeEventDetail } from "@ionic/core";
import { IonSearchbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useState } from "react";

export interface SearchBarProps {
  onSearch: (value: string) => any;
  [others: string]: any;
}

function SearchBar({ onSearch, ...others }: SearchBarProps) {
  const [value, setValue] = useState("");

  function changeSearchText(event: CustomEvent<SearchbarChangeEventDetail>) {
    const text = event.detail.value as string;
    setValue(text);
    onSearch(text);
  }

  return (
    <IonSearchbar
      mode="ios"
      value={value}
      onIonChange={changeSearchText}
      {...others}
    ></IonSearchbar>
  );
}

export default SearchBar;
