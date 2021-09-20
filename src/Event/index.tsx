import {
  IonPage,
  IonList,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonTitle,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonItem,
  IonThumbnail,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonIcon,
} from "@ionic/react";

import { calendarOutline, earthOutline, mapOutline } from "ionicons/icons";
import { useState } from "react";
import SegmentPanel from "../Components/SegmentPanel";
import { MenuButton } from "../Components/SideMenu";
import { SegmentChangeEventDetail } from "@ionic/core";

const Event: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("signUp");

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="primary">
          <MenuButton slot="start" />
          <IonTitle className="text-2xl">Event Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList lines="none">
        <IonItem>+10 Going</IonItem>
        <IonItem className="text-2xl font-bold">Weekly Practice</IonItem>
        <IonItem>
          <IonThumbnail slot="start">
            <IonImg
              src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
              alt="group banner"
              className="rounded-md"
            />
          </IonThumbnail>
          <IonGrid>
            <IonRow>
              <IonLabel className="font-bold">NUS Rock Climbing</IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="text-xs">Organizing Group</IonLabel>
            </IonRow>
          </IonGrid>
          <IonButton slot="end">View Group</IonButton>
        </IonItem>
        <IonItem>
          <IonIcon icon={calendarOutline} className="pr-3" />
          <IonGrid>
            <IonRow>
              <IonLabel>21 September 2021</IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="text-sm">16:00 - 18:30</IonLabel>
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonIcon icon={mapOutline} className="pr-3" />
          <IonLabel>UTown Rock Wall</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon icon={earthOutline} className="pr-3" />
          <IonLabel>Public Event</IonLabel>
        </IonItem>
      </IonList>
      <IonContent>
        <IonSegment
          mode="ios"
          value={selectedSegment}
          onIonChange={changeSegment}
          color="primary-contrast"
        >
          <IonSegmentButton value="signUp">
            <IonLabel>Sign Up</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="about">
            <IonLabel>About</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <SegmentPanel value="signUp" selected={selectedSegment}>
          <IonList lines="none">
            <IonItem>
              Note that you can only join one slot. If there are no slots left,
              you can join the waitlist, and will be automatically registered if
              a slot becomes available.
            </IonItem>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonLabel className="font-bold">Junior</IonLabel>
                </IonRow>
                <IonRow>
                  <IonLabel className="text-xs">Remaining slots: 0</IonLabel>
                </IonRow>
              </IonGrid>
              <IonButton slot="end">Waitlisted</IonButton>
            </IonItem>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonLabel className="font-bold">All</IonLabel>
                </IonRow>
                <IonRow>
                  <IonLabel className="text-xs">Remaining slots: 4</IonLabel>
                </IonRow>
              </IonGrid>
              <IonButton slot="end">Sign up</IonButton>
            </IonItem>
          </IonList>
        </SegmentPanel>
        <SegmentPanel value="about" selected={selectedSegment}>
          {/* <ExploreGroups /> */}
          <IonList lines="none">
            <IonItem>Some event descriptions</IonItem>
          </IonList>
        </SegmentPanel>
      </IonContent>
    </IonPage>
  );
};

export default Event;
