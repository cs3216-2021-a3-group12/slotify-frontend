import React, { useState } from "react";
import {
    IonApp,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonSlide,
    IonSlides,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonList,
    IonItem,
} from "@ionic/react";
import EventCard from "./EventCard";
import GroupCard from "./GroupCard";

function Home() {
    const [name, setName] = useState("John");
    return (
        <IonApp>
            <IonToolbar color="primary" className="rounded-b-3xl h-1/5 flex">
                <IonButtons>
                    <IonMenuButton autoHide={false} />
                </IonButtons>
                <IonTitle className="flex-initial self-end text-2xl">
                    Hello, {name}!
                </IonTitle>
            </IonToolbar>
            <IonContent className="h-auto overflow-scroll p-2">
                <div className="h-80 flex flex-col">
                    <div className="p-3 h-12">
                        <span className="text-xl">Your Events</span>
                    </div>
                    <IonSlides
                        scrollbar={true}
                        options={{ slidesPerView: "auto" }}
                    >
                        <IonSlide className="w-2/3 h-auto mt-2 mb-4">
                            <EventCard />
                        </IonSlide>
                        <IonSlide className="w-2/3 h-auto mt-2 mb-4">
                            <EventCard />
                        </IonSlide>
                        <IonSlide className="w-2/3 h-auto mt-2 mb-4">
                            <EventCard />
                        </IonSlide>
                    </IonSlides>
                </div>

                <div className="h-80 w-screen flex flex-col">
                    <div className="p-3 h-12">
                        <span className="text-xl">Your Groups</span>
                    </div>
                    <GroupCard />
                    {/* <IonItem className="w-full h-24 mt-2 mb-4">
                        <GroupCard />
                    </IonItem>
                    <IonItem className="w-full h-24 mt-2 mb-4">
                        <GroupCard />
                    </IonItem> */}
                </div>
            </IonContent>
        </IonApp>
    );
}

export default Home;
