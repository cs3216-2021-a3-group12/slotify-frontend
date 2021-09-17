import { useRef } from "react";
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

function CreateGroup() {
  const slidersRef = useRef<HTMLIonSlidesElement>(null);

  function onFormNext(group: any) {
    console.log(group);
    slidersRef.current!.slideNext();
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
          className="w-full"
        >
          <IonSlide>
            <GroupForm submitButtonLabel="Next" onSubmit={onFormNext} />
          </IonSlide>
          <IonSlide>Test2</IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
}

export default CreateGroup;
