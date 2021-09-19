import { useState, useEffect } from "react";
import {
  IonContent,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonButton,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import { StrippedEvent } from "../types/Event";
import GroupEventCard from "./GroupEventCard";

function GroupEvents() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState<StrippedEvent[]>([]);
  useEffect(() => {
    setIsAdmin(true);
    setEvents([
      {
        id: "id-1",
        name: "Event Name 1",
        datetime: "Time 1",
        location: "Location 1",
        imgUrl: "https://picsum.photos/200",
      },
      {
        id: "id-2",
        name: "Event Name 2",
        datetime: "Time 2",
        location: "Location 2",
        imgUrl: "https://picsum.photos/200",
      },
      {
        id: "id-3",
        name: "Event Name 3",
        datetime: "Time 3",
        location: "Location 3",
        imgUrl: "https://picsum.photos/200",
      },
    ]);
  }, []);
  return (
    <IonContent>
      <div className="flex flex-col ">
        {isAdmin && (
          <IonButton shape="round" className="mx-10 my-4">
            Create an Event
          </IonButton>
        )}

        {events.map((event) => {
          return (
            <IonSlide key={event.id}>
              <GroupEventCard event={event} />
            </IonSlide>
          );
        })}
      </div>
    </IonContent>
  );
}

export default GroupEvents;
