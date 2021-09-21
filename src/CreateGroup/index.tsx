import { useHistory } from "react-router";
import {
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonContent,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import axios from "axios";

import { CreateGroupDetails } from "../types/Group";
import GroupForm from "./GroupForm";
import { useAuthState } from "../AuthContext";

function CreateGroup() {
  const userDetails = useAuthState();
  const history = useHistory();

  async function createGroup(group: CreateGroupDetails) {
    const formData = new FormData();
    formData.append("name", group.name);
    formData.append("description", group.description ?? "");
    if (group.categoryId) {
      formData.append("category", group.categoryId.toString());
    }
    if (group.imgBlob) {
      const blob = await fetch(group.imgBlob)
        .then((res) => res.blob())
        .catch((err) => {
          console.error(err);
        });
      if (blob) {
        console.log(blob);
        formData.append("banner_url", blob, group.imgFileName ?? "banner.jpg");
      }
    }

    axios
      .post("https://api.slotify.club/api/v1/groups/new", formData, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.id) {
          console.log(res.data);
          history.replace(`/groups/${res.data.id}`);
        }
      })
      .catch((err) => {
        if (err.response.data) {
          console.error(err.response.data);
        } else {
          console.error(err);
        }
      });
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="primary" defaultHref="/home" />
          </IonButtons>
          <IonTitle className="text-2xl">Create a Group</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="text-center">
        <GroupForm submitButtonLabel="Create" onSubmit={createGroup} />
      </IonContent>
    </IonPage>
  );
}

export default CreateGroup;
