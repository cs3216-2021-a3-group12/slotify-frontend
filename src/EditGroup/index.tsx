import { useHistory, useLocation, useRouteMatch } from "react-router";
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

import { GroupFormDetails, StrippedGroup } from "../types/Group";
import GroupForm from "../CreateGroup/GroupForm";
import { useAuthState } from "../AuthContext";
import { useEffect, useState } from "react";

function EditGroup() {
  const match = useRouteMatch<{ id: string }>();
  const location = useLocation<{ group: StrippedGroup }>();
  const userDetails = useAuthState();
  const history = useHistory();

  const [groupId, setGroupId] = useState("");
  const [group, setGroup] = useState<any>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setGroupId(match.params.id);
    }
    if (location.state && location.state.group) {
      setGroup({
        name: location.state.group.name,
        description: location.state.group.description,
        selectedCategoryId: location.state.group.category.id,
        imageSrc: location.state.group.banner_url,
      });
      setIsLoaded(true);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line
  }, [location.state]);

  async function editGroup(group: GroupFormDetails) {
    const formData = new FormData();
    formData.append("name", group.name);
    formData.append("description", group.description ?? "");
    if (group.categoryId) {
      formData.append("category", group.categoryId.toString());
    }
    if (group.imgFileName && group.imgBlob) {
      const blob = await fetch(group.imgBlob)
        .then((res) => res.blob())
        .catch((err) => {
          console.error(err);
        });
      if (blob) {
        formData.append("banner_url", blob, group.imgFileName ?? "banner.jpg");
      }
    }

    axios
      .patch(`https://api.slotify.club/api/v1/groups/${groupId}/`, formData, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.id) {
          history.replace(`/groups/${res.data.id}`, {
            groupid: groupId,
          });
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
    isLoaded && (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton color="primary" defaultHref="/home" />
            </IonButtons>
            <IonTitle className="text-2xl">Edit {group.name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="text-center">
          <GroupForm
            submitButtonLabel="Edit"
            onSubmit={editGroup}
            group={group}
          />
        </IonContent>
      </IonPage>
    )
  );
}

export default EditGroup;
