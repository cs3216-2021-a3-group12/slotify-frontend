import { IonContent, IonButton } from "@ionic/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { DetailedGroup } from "../types/Group";

export interface GroupAboutProps {
  group: DetailedGroup;
}

const GroupAbout: React.FC<GroupAboutProps> = ({ group }) => {
  return (
    <IonContent>
      <p className="h-1/2 text-center leading-none p-10">{group.description}</p>
      <div className="flex flex-col mx-12 h-1/2">
        {group.is_admin ? (
          <Fragment>
            <Link
              to={{
                pathname: `/editGroup/${group.id}`,
                state: { group: group },
              }}
            >
              <IonButton className="w-full">Edit Group</IonButton>
            </Link>
            <IonButton color="danger">Delete Group</IonButton>
          </Fragment>
        ) : (
          <IonButton>Request to Join</IonButton>
        )}
      </div>
    </IonContent>
  );
};

export default GroupAbout;
