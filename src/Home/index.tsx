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
  IonList,
  IonRouterLink,
  IonLabel,
} from "@ionic/react";
import { StrippedEvent } from "../types/Event";
import EventCard from "./EventCard";
import GroupCard, { Group } from "./GroupCard";
import { MenuButton } from "../Components/SideMenu";
import { personCircleOutline, chevronForwardOutline } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import AddCard from "../Components/AddCard";
import { useAuthState } from "../AuthContext";

function Home() {
  const userDetails = useAuthState();
  const history = useHistory();

  const [name, setName] = useState("");
  const [events, setEvents] = useState<StrippedEvent[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  useEffect(() => {
    setName(userDetails.username);
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
        <div className="h-80 flex flex-col ">
          <div className="p-3 h-12 flex justify-between">
            <span className="text-xl">Your Events</span>
            <Link
              to={{ pathname: "/explore", state: { segment: "events" } }}
              className="inline-flex items-center"
            >
              <IonRouterLink>Explore events</IonRouterLink>
              <IonIcon color="primary" icon={chevronForwardOutline} />
            </Link>
          </div>
          {events.length ? (
            <IonSlides scrollbar={true} options={{ slidesPerView: "auto" }}>
              {events.map((event) => {
                return (
                  <IonSlide key={event.id} className="w-2/3 h-auto mt-2 mb-4">
                    <EventCard event={event} />
                  </IonSlide>
                );
              })}
            </IonSlides>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <IonLabel className="text-lg text-gray-400">
                No events signed up
              </IonLabel>
            </div>
          )}
        </div>

        <IonList>
          <div className="p-3 h-12 flex justify-between">
            <span className="text-xl">Your Groups</span>
            <Link
              to={{ pathname: "/explore", state: { segment: "groups" } }}
              className="inline-flex items-center"
            >
              <IonRouterLink>Explore groups</IonRouterLink>
              <IonIcon color="primary" icon={chevronForwardOutline} />
            </Link>
          </div>
          {groups.map((group) => {
            return <GroupCard key={group.id} group={group} />;
          })}
          <AddCard
            className="m-3"
            label="Create a group"
            onClick={() => history.push("/group/create")}
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Home;
