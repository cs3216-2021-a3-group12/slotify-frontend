import { useRef, useState } from "react";
import {
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonContent,
  IonSlides,
  IonSlide,
} from "@ionic/react";

import { MenuButton } from "../Components/SideMenu";
import GroupForm from "./GroupForm";
import GroupReview from "./GroupReview";
import GroupDone from "./GroupDone";

type GroupDetails = {
  name: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  imgBlob?: string;
};

function CreateGroup() {
  const slidersRef = useRef<HTMLIonSlidesElement>(null);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | undefined>(
    undefined
  );

  function onFormNext(group: GroupDetails) {
    setGroupDetails(group);
    if (slidersRef.current) slidersRef.current.slideNext();
  }

  function slidePrevious() {
    if (slidersRef.current) slidersRef.current.slidePrev();
  }

  function createGroup() {
    if (groupDetails) {
      const formData = new FormData();
      var key: keyof GroupDetails;
      for (key in groupDetails) {
        var value = groupDetails[key];
        if (value) {
          formData.append(key, value as string | Blob);
        }
      }
      // @ts-ignore
      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      fetch("https://api.slotify.club/api/v1/groups/new", {
        method: "POST",
        headers: {
          Authorisation:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMxOTc4MTA3LCJqdGkiOiIzYjkwZjU5MDg1Y2Y0Mjc5OWQ0MDY3MTdjMjE5NzkwZCIsInVzZXJfaWQiOjF9.pRXxh3jeoBPpWrDwhikM20BxY0fKatgxPFdYyWZy_LU",
        },
        body: formData,
      })
        .then((res) => {
          console.log(res.json());
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // if (slidersRef.current) slidersRef.current.slideNext();
  }

  return (
    <IonPage id="main">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <MenuButton slot="start" />
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
            <GroupDone gotoGroup={slidePrevious} />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
}

export default CreateGroup;
