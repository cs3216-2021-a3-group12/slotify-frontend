import React, { useState } from "react";
import { IonApp, IonTitle, IonToolbar } from "@ionic/react";

function Home() {
    const [name, setName] = useState("John");
    return (
        <IonApp>
            <IonToolbar className="rounded-b-lg bg-primary h-1/5 flex">
                <IonTitle className="self-bottom">Hello, {name}</IonTitle>
            </IonToolbar>
        </IonApp>
    );
}

export default Home;
