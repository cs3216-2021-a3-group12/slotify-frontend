import { useRef, useState } from "react";
import {
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonContent,
  IonSlides,
  IonSlide,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

import GroupForm from "./GroupForm";
import GroupReview from "./GroupReview";
import GroupDone from "./GroupDone";
import { CreateGroupDetails } from "../types/Group";

function CreateGroup() {
  const slidersRef = useRef<HTMLIonSlidesElement>(null);
  const [groupDetails, setGroupDetails] = useState<
    CreateGroupDetails | undefined
  >(undefined);
  const [groupId, setGroupId] = useState<number | undefined>(undefined);

  function onFormNext(group: CreateGroupDetails) {
    setGroupDetails(group);
    slideNext();
  }

  function slidePrevious() {
    if (slidersRef.current) slidersRef.current.slidePrev();
  }
  function slideNext() {
    if (slidersRef.current) slidersRef.current.slideNext();
  }

  async function createGroup() {
    if (!groupDetails) return;

    const formData = new FormData();
    formData.append("name", groupDetails.name);
    formData.append("description", groupDetails.description ?? "");
    if (groupDetails.categoryId) {
      formData.append("category", groupDetails.categoryId.toString());
    }
    if (groupDetails.imgBlob) {
      const blob = await fetch(groupDetails.imgBlob)
        .then((res) => res.blob())
        .catch((err) => {
          console.error(err);
        });
      if (blob) {
        console.log(blob);
        formData.append(
          "banner_url",
          blob,
          groupDetails.imgFileName ?? "banner.jpg"
        );
      }
    }

    // TODO: Authorization flow
    fetch("https://api.slotify.club/api/v1/groups/new", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyNTA0OTI1LCJqdGkiOiI1MjliMTg0ZjBhYjk0YWZhOTBhODc1YTYxNGI0NzhmNCIsInVzZXJfaWQiOjF9.hRpTrSU8J9b0mETwRrIwJFvHRot_qWbWZCoWKvP8CRo",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setGroupId(data.id);
        slideNext();
      })
      .catch((err) => {
        console.error(err);
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
        <IonSlides
          ref={slidersRef}
          options={{ allowTouchMove: false, autoHeight: true }}
          className="w-full h-auto min-h-full"
        >
          <IonSlide>
            <GroupForm submitButtonLabel="Next" onSubmit={onFormNext} />
          </IonSlide>
          <IonSlide>
            {groupDetails && (
              <GroupReview
                group={groupDetails}
                onBack={slidePrevious}
                onCreate={createGroup}
              />
            )}
          </IonSlide>
          <IonSlide>
            <GroupDone groupId={groupId} gotoGroup={slidePrevious} />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
}

export default CreateGroup;
