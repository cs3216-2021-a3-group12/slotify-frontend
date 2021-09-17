import { useState, useEffect } from "react";
import {
    IonTitle,
    IonToolbar,
    IonPage,
    IonHeader,
    IonSegment,
} from "@ionic/react";
import { SegmentChangeEventDetail } from "@ionic/core";

import { MenuButton } from "../Components/SideMenu";
import SegmentPanel from "../Components/SegmentPanel";
import ExploreSegmentButton from "./ExploreSegmentButton";
import ExploreEvents from "./ExploreEvents";
import ExploreGroups from "./ExploreGroups";

import "./Explore.css";

function Explore() {
    const [selectedSegment, setSelectedSegment] = useState("events");

    useEffect(() => {}, []);

    function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
        let value = e.detail.value as string;
        if (value) setSelectedSegment(value);
    }

    return (
        <IonPage id="main">
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <MenuButton slot="start" />
                    <IonTitle className="text-2xl">Explore</IonTitle>
                </IonToolbar>
            </IonHeader>
            <div>
                <p className="explore-prompt-text">
                    Discover new groups and events to make the most of your
                    student life!
                </p>
                <IonSegment
                    mode="ios"
                    className="explore-segment"
                    value={selectedSegment}
                    onIonChange={changeSegment}
                >
                    <ExploreSegmentButton
                        value="events"
                        selected={selectedSegment}
                    >
                        Events
                    </ExploreSegmentButton>
                    <ExploreSegmentButton
                        value="groups"
                        selected={selectedSegment}
                    >
                        Groups
                    </ExploreSegmentButton>
                </IonSegment>
            </div>
            <SegmentPanel value="events" selected={selectedSegment}>
                <ExploreEvents />
            </SegmentPanel>
            <SegmentPanel value="groups" selected={selectedSegment}>
                <ExploreGroups />
            </SegmentPanel>
        </IonPage>
    );
}

export default Explore;
