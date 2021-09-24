import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonList,
  IonCardSubtitle,
  IonIcon,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import axios from "axios";

import { StrippedEvent } from "../types/Event";
import SearchBar from "../Components/SearchBar";
import eventPlaceholder from "../resources/event-placeholder.jpg";
import { getTimeDateText } from "../Event/helper";

export interface ExploreEventsProps {
  events: StrippedEvent[];
}

function ExploreEvents() {
  // eslint-disable-next-line
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
                className="rounded-2xl w-auto h-32 mt-3 flex justify-between"
                key={idx}
              >
                <div className="h-full w-1/3">
                  <img
                    className="h-full w-full p-2 object-fill rounded-2xl"
                    alt="Group"
                    src={event.image_url ?? eventPlaceholder}
                  />
                </div>

                <div className="w-2/3 p-3 flex flex-col justify-center">
                  <IonCardContent className="text-left p-0 text-base sm:text-xs md:text-sm ">
                    <p className="text-indigo-500">
                      {getTimeDateText(
                        event.start_date_time,
                        event.end_date_time
                      )}
                    </p>
                  </IonCardContent>
                  <IonCardHeader className="w-full text-left p-0">
                    <IonCardTitle className="text-lg sm:text-base leading-1 line-clamp-2">
                      {event.title}
                    </IonCardTitle>
                    <IonCardSubtitle className="flex items-center">
                      <IonIcon
                        icon={locationOutline}
                        size="small"
                        className="my-2"
                      />
                      {event.location}
                    </IonCardSubtitle>
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
