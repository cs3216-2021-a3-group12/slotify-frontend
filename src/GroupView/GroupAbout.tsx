import { IonContent, IonButton } from "@ionic/react";
import { useState, useEffect } from "react";
import { DetailedGroup } from "../types/Group";

export interface GroupAboutProps {
  group: DetailedGroup;
}

const GroupAbout: React.FC<GroupAboutProps> = ({ group }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(true);
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
};

export default GroupAbout;
