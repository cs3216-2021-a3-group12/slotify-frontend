import { IonContent, IonButton } from "@ionic/react";
import { useState, useEffect } from "react";
import { StrippedEvent } from "../types/Event";
import { StrippedGroup } from "../types/Group";

export interface ExploreEventsProps {
  events: StrippedEvent[];
}

function GroupAbout() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [group, setGroup] = useState<StrippedGroup>(testGroup);

  useEffect(() => {
    setIsAdmin(true);
    setGroup(testGroup);
  }, []);

  return (
    <IonContent>
      <p className="group-about-text">{group.description}</p>
      {isAdmin && (
        <div className="flex flex-col mx-12">
          <IonButton>Edit Group</IonButton>
          <IonButton color="danger">Delete Group</IonButton>
        </div>
      )}
    </IonContent>
  );
}

export default GroupAbout;

const testGroup = {
  id: 1,
  name: "Group Name 1",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum amet, enim sit cursus metus, imperdiet tortor volutpat. Turpis donec donec egestas enim, risus at quis ultrices etiam. Fermentum tortor in amet lorem vitae tristique quis sit convallis. Lorem quam cursus dolor, et turpis.",
  category: {
    id: 1,
    name: "Category 1",
  },
  banner_url: "https://picsum.photos/200",
};
