import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonList,
} from "@ionic/react";
import { useState, useEffect, Fragment } from "react";
import { StrippedEvent } from "../types/Event";
import SearchBar from "./SearchBar";

export interface ExploreEventsProps {
  events: StrippedEvent[];
}

function ExploreEvents() {
  const [events, setEvents] = useState<StrippedEvent[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<StrippedEvent[]>([]);

  useEffect(() => {
    setEvents(testEvents);
    setDisplayedEvents(testEvents);
  }, []);

  function searchEvents(text: string) {
    setDisplayedEvents(
      events.filter((event) => Object.values(event).join(" ").includes(text))
    );
  }

  return (
    <Fragment>
      <IonList className="p-0">
        <SearchBar slot="fixed" onSearch={searchEvents} />
      </IonList>
      <IonContent>
        {displayedEvents.map((event, idx) => {
          return (
            <IonCard
              key={idx}
              className="explore-event-card"
              onClick={() => console.log("click")}
            >
              <div className="explore-event-card-img-div">
                <img
                  className="explore-event-card-img"
                  alt="Group"
                  src={event.imgUrl}
                />
              </div>

              <div className="explore-event-card-text-div">
                <IonCardContent className="explore-event-card-content">
                  <p className="explore-event-card-datetime">
                    {event.datetime}
                  </p>
                </IonCardContent>
                <IonCardHeader className="explore-event-card-header">
                  <IonCardTitle className="explore-event-card-name">
                    {event.name}
                  </IonCardTitle>
                </IonCardHeader>
              </div>
            </IonCard>
          );
        })}
      </IonContent>
    </Fragment>
  );
}

export default ExploreEvents;

const testEvents = [
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
  {
    id: "id-3",
    name: "Event Name 3",
    datetime: "Time 3",
    location: "Location 3",
    imgUrl: "https://picsum.photos/200",
  },
  {
    id: "id-3",
    name: "Event Name 3",
    datetime: "Time 3",
    location: "Location 3",
    imgUrl: "https://picsum.photos/200",
  },
];
