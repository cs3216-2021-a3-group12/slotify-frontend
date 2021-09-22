import { IonContent, IonButton } from "@ionic/react";
import { DetailedGroup } from "../types/Group";

export interface GroupAboutProps {
  group: DetailedGroup;
}

const GroupAbout: React.FC<GroupAboutProps> = ({ group }) => {
  return (
    <IonContent>
      <p className="group-about-text">{group.description}</p>
      {group.is_admin && (
        <div className="flex flex-col mx-12">
          <IonButton>Edit Group</IonButton>
          <IonButton color="danger">Delete Group</IonButton>
        </div>
      )}
    </IonContent>
  );
};

export default GroupAbout;
