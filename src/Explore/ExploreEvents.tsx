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
import SearchBar from "../Components/SearchBar";
import axios from "axios";
import eventPlaceholder from "../resources/event-placeholder.jpg";
import moment from "moment";
import { Link } from "react-router-dom";

export interface ExploreEventsProps {
  events: StrippedEvent[];
}

function ExploreEvents() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [events, setEvents] = useState<StrippedEvent[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<StrippedEvent[]>([]);

  useEffect(() => {
    axios
      .get("https://api.slotify.club/api/v1/events/")
      .then((eventRes) => {
        setEvents(eventRes.data.results);
        setDisplayedEvents(eventRes.data.results);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  }, []);

  function getTimeDateText(event: StrippedEvent) {
    const start = new Date(event.start_date_time);
    const end = new Date(event.end_date_time);
    const startMoment = moment(start);
    const endMoment = moment(end);

    if (
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${startMoment.format("DD MMM")} | ${startMoment.format(
        "ddd"
      )} | ${startMoment.format("H:mmA")} - ${endMoment.format("H:mmA")}`;
    }
    return `${startMoment.format("DD MMM H:mmA")} - ${endMoment.format(
      "DD MMM H:mmA"
    )}`;
  }

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
            <Link to={`/events/${event.id}`}>
              <IonCard
                key={idx}
                className="rounded-2xl w-auto h-28 mt-3 flex justify-between"
              >
                <div className="h-full w-1/3">
                  <img
                    className="h-full w-full p-2 object-fill rounded-2xl"
                    alt="Group"
                    src={event.image_url ?? eventPlaceholder}
                  />
                </div>

                <div className="w-2/3 p-3">
                  <IonCardContent className="text-left p-0">
                    <p className="text-indigo-500">{getTimeDateText(event)}</p>
                  </IonCardContent>
                  <IonCardHeader className="w-full text-left p-0">
                    <IonCardTitle className="text-lg">
                      {event.title}
                    </IonCardTitle>
                  </IonCardHeader>
                </div>
              </IonCard>
            </Link>
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
