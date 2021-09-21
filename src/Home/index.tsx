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
import EventCard from "./EventCard";
import GroupCard, { Group } from "./GroupCard";
import { MenuButton } from "../Components/SideMenu";
import { personCircleOutline } from "ionicons/icons";

function Home() {
  const [name, setName] = useState("");
  const [events, setEvents] = useState<StrippedEvent[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  useEffect(() => {
    setName("User Name");
    setEvents([
      {
        id: "1",
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
    setGroups([
      {
        id: "id-1",
        name: "Group Name 1",
        categoryId: "cid-1",
        category: "Category 1",
        imgUrl: "https://picsum.photos/200",
      },
      {
        id: "id-2",
        name: "Group Name 2",
        categoryId: "cid-2",
        category: "Category 2",
        imgUrl: "https://picsum.photos/200",
      },
    ]);
  }, []);
  return (
    <IonPage id="main">
      <IonHeader className="ion-no-border h-1/5">
        <IonToolbar color="primary" className="h-1/2">
          <MenuButton />
          <IonButtons slot="end">
            <IonButton routerLink="/profile">
              <IonIcon size="large" icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="primary" className="rounded-b-3xl h-1/2">
          <IonTitle size="large" className="w-full">
            Hello, {name}!
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} scrollEvents={true}>
        <div className="flex flex-col">
          <div className="p-3 h-8">
            <span className="text-xl">Your Events</span>
          </div>
          <IonSlides scrollbar={true} options={{ slidesPerView: "auto" }}>
            {events.map((event) => {
              return (
                <IonSlide key={event.id} className="w-2/3 h-auto mt-2 mb-4">
                  <EventCard event={event} />
                </IonSlide>
              );
            })}
          </IonSlides>
        </div>

        <div className="h-80 w-screen flex flex-col">
          <div className="p-3 h-12">
            <span className="text-xl">Your Groups</span>
          </div>
          {groups.map((group) => {
            return <GroupCard key={group.id} group={group} />;
          })}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Home;
