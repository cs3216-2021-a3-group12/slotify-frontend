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
  IonChip,
} from "@ionic/react";

import { calendarOutline, earthOutline, mapOutline } from "ionicons/icons";
import { useState } from "react";
import SegmentPanel from "../Components/SegmentPanel";
import { MenuButton } from "../Components/SideMenu";
import { SegmentChangeEventDetail } from "@ionic/core";
import Slot, { SlotStatus } from "./Slot";

const Event: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("signUp");

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }
  const event = {
    id: "id-1",
    name: "Weekly Practice",
    date: "21 September 2021",
    time: "16:00 - 18:30",
    location: "UTown Rock Wall",
    imgUrl: "https://picsum.photos/200",
    isPublic: true,
  };
  const group = {
    name: "NUS Rock Climbing Club",
    bannerUrl:
      "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
  };
  const slots = [
    {
      tag: "junior",
      remainingSlots: 10,
      status: SlotStatus.Signup,
    },
    {
      tag: "senior",
      remainingSlots: 10,
      status: SlotStatus.Waitlisted,
    },
  ];
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <MenuButton slot="start" />
          <IonTitle className="text-2xl">Event Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div
        style={{ background: `url(${event.imgUrl})` }}
        className="h-40"
      ></div>
      <IonList lines="none">
        <IonItem>
          <div className="flex mx-auto">
            <IonChip outline={true} className="shadow">
              +10 Going
            </IonChip>
          </div>
        </IonItem>
        <IonItem className="text-2xl font-bold">{event.name}</IonItem>
        <IonItem>
          <IonThumbnail slot="start">
            <IonImg
              src={group.bannerUrl}
              alt="group banner"
              className="rounded-md"
            />
          </IonThumbnail>
          <IonGrid>
            <IonRow>
              <IonLabel className="font-bold">{group.name}</IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="text-xs">Organizing Group</IonLabel>
            </IonRow>
          </IonGrid>
          <IonButton slot="end" color="secondary" fill="outline">
            View Group
          </IonButton>
        </IonItem>
        <IonItem>
          <IonIcon icon={calendarOutline} className="pr-3" />
          <IonGrid>
            <IonRow>
              <IonLabel>{event.date}</IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="text-sm">{event.time}</IonLabel>
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonIcon icon={mapOutline} className="pr-3" />
          <IonLabel>{event.location}</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon icon={earthOutline} className="pr-3" />
          <IonLabel>
            {event.isPublic ? "Public Event" : "Private Event"}
          </IonLabel>
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
            {slots.map((slot) => (
              <Slot
                tag={slot.tag}
                remainingSlots={slot.remainingSlots}
                status={slot.status}
                key={slot.tag}
              />
            ))}
          </IonList>
        </SegmentPanel>
        <SegmentPanel value="about" selected={selectedSegment}>
          <IonList lines="none">
            <IonItem>Some event descriptions</IonItem>
          </IonList>
        </SegmentPanel>
      </IonContent>
    </IonPage>
  );
};

export default Event;
