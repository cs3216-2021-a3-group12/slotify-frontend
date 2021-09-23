import { IonContent, IonButton, IonAlert } from "@ionic/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "../AuthContext";
import { DetailedGroup } from "../types/Group";

export interface GroupAboutProps {
  group: DetailedGroup;
}

const GroupAbout: React.FC<GroupAboutProps> = ({ group }) => {
  const history = useHistory();
  const userDetails = useAuthState();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [status, setStatus] = useState(group.status);
  function requestJoin() {
    axios({
      method: "post",
      url: "https://api.slotify.club/api/v1/groups/memberships/new",
      headers: {
        Authorization: `Bearer ${userDetails.accessToken}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        group: group.id,
      }),
    })
      .then((res) => {
        setStatus("requested");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function deleteGroup() {
    axios
      .delete(`https://api.slotify.club/api/v1/groups/${group.id}`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        history.push("/home");
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }

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
            <IonButton color="danger" onClick={() => setShowDeleteAlert(true)}>
              Delete Group
            </IonButton>
          </Fragment>
        ) : status === "public" ? (
          <IonButton onClick={() => requestJoin()}> Request to Join</IonButton>
        ) : (
          status === "requested" && <IonButton disabled>Requested</IonButton>
        )}
      </div>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={"Warning"}
        message={"Are you sure you want to remove this group?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Remove",
            cssClass: "text-red-500",
            handler: () => deleteGroup(),
          },
        ]}
      />
    </IonContent>
  );
};

export default GroupAbout;
