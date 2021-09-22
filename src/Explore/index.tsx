import { useState, useEffect } from "react";
import {
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonSegment,
  IonList,
} from "@ionic/react";
import { SegmentChangeEventDetail } from "@ionic/core";

import { MenuButton } from "../Components/SideMenu";
import SegmentPanel from "../Components/SegmentPanel";
import ExploreSegmentButton from "./ExploreSegmentButton";
import ExploreEvents from "./ExploreEvents";
import ExploreGroups from "./ExploreGroups";

import "./Explore.css";

function Explore(props: any) {
  const [selectedSegment, setSelectedSegment] = useState("events");

  useEffect(() => {
    if (props.location.state) {
      setSelectedSegment(props.location.state.segment);
    }
  }, [props.location.state]);

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <MenuButton slot="start" />
          <IonTitle className="text-2xl">Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList className="p-0">
        <p className="explore-prompt-text">
          Discover new groups and events to make the most of your student life!
        </p>
        <IonSegment
          mode="ios"
          className="w-1/2 mx-auto my-2"
          value={selectedSegment}
          onIonChange={changeSegment}
        >
          <ExploreSegmentButton value="events" selected={selectedSegment}>
            Events
          </ExploreSegmentButton>
          <ExploreSegmentButton value="groups" selected={selectedSegment}>
            Groups
          </ExploreSegmentButton>
        </IonSegment>
      </IonList>
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
