import { useState, useEffect } from "react";
import { IonContent, IonButton } from "@ionic/react";
import { StrippedEvent } from "../types/Event";
import GroupEventCard from "./GroupEventCard";
import { Link } from "react-router-dom";

export interface GroupEventsProps {
  groupId: number;
  isAdmin: boolean;
}

const GroupEvents: React.FC<GroupEventsProps> = ({ groupId, isAdmin }) => {
  const [events, setEvents] = useState<StrippedEvent[]>([]);
  useEffect(() => {
    fetch(`https://api.slotify.club/api/v1/events/?group=${groupId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setEvents(data.results);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [groupId]);
  return (
    <IonContent>
      <div className="flex flex-col ">
        {isAdmin && (
          <Link
            className="mx-10 mt-4"
            to={{
              pathname: `/createEvent/${groupId}`,
              state: { group: groupId },
            }}
          >
            <IonButton shape="round" className="w-full">
              Create an Event
            </IonButton>
          </Link>
        )}

        {events.map((event) => {
          return (
            <Link to={`/events/${event.id}`} key={event.id}>
              <GroupEventCard event={event} />
            </Link>
          );
        })}
      </div>
    </IonContent>
  );
};

export default GroupEvents;
