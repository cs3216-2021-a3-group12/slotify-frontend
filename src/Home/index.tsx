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
import { StrippedEvent, Event } from "../types/Event";
import EventCard from "./EventCard";
import GroupCard, { Group } from "./GroupCard";
import { MenuButton } from "../Components/SideMenu";
import { personCircleOutline } from "ionicons/icons";
import { axios_with_token_refresh } from "../helper/axios_helper";
import { ACCESS } from "../types/Login";

function Home() {
  const [name, setName] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchEvents = () => {
    axios_with_token_refresh
      .get("/events/my_events", {
        headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS)}` },
      })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEvents();

    setName("User Name");
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
        <div className="h-80 flex flex-col">
          <div className="p-3 h-12">
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
