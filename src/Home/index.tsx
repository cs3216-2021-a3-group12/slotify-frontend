import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { personCircleOutline, chevronForwardOutline } from "ionicons/icons";
import axios from "axios";

import EventCard from "./EventCard";
import GroupCard from "./GroupCard";
import { MenuButton } from "../Components/SideMenu";
import AddCard from "../Components/AddCard";
import { useAuthState } from "../AuthContext";
import { StrippedGroup } from "../types/Group";
import { StrippedEvent } from "../types/Event";

function Home() {
  const userDetails = useAuthState();
  const history = useHistory();

  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [events, setEvents] = useState<StrippedEvent[]>([]);
  const [groups, setGroups] = useState<StrippedGroup[]>([]);
  useEffect(() => {
    setName(userDetails.username);
    const axios_instance = axios.create({
      baseURL: "https://api.slotify.club/api/v1",
      headers: {
        Authorization: `Bearer ${userDetails.accessToken}`,
      },
    });
    Promise.all([
      axios_instance.get("/events/my_events"),
      axios_instance.get("/groups/my_groups"),
    ])
      .then(([eventsRes, groupsRes]) => {
        const events = eventsRes.data.map((_data: any) => _data.event);
        setEvents(events);
        setGroups(groupsRes.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userDetails.username, userDetails.accessToken]);

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
            <IonSlides
              className="w-full h-full"
              scrollbar={true}
              options={{ slidesPerView: "auto" }}
            >
              {events.map((event) => {
                return (
                  <IonSlide key={event.id} className="w-56 h-auto p-3">
                    <Link to={`/events/${event.id}`} className="w-full h-full">
                      <EventCard event={event} />
                    </Link>
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
            return (
              <Link to={`/groups/${group.id}`} key={group.id}>
                <GroupCard group={group} />
              </Link>
            );
          })}
          <AddCard
            className="m-3"
            label="Create a group"
            onClick={() => history.push("/createGroup")}
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Home;
