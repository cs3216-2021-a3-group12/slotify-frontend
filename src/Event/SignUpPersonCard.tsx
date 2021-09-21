import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonIcon,
} from "@ionic/react";
import { paperPlaneOutline, mailOutline } from "ionicons/icons";
import Tag from "../Components/Tag";
import { useEffect, useState } from "react";
import { EventSignUp } from "../types/EventSignUp";

function SignUpPersonCard({
  isAdmin,
  signUp,
}: {
  isAdmin: boolean;
  signUp: EventSignUp;
}) {
  const [didAttend, setDidAttend] = useState(false);
  useEffect(() => {}, []);

  useEffect(() => {}, [didAttend]);
  return (
    <IonCard className="rounded-2xl mt-3">
      <IonCardHeader className="text-left px-1 py-0 truncate">
        <div className="flex justify-between">
          <div className="w-1/2 flex flex-col p-3">
            <IonCardTitle className="truncate text-base">
              User's Name
            </IonCardTitle>
            <IonCardSubtitle>A0123456X</IonCardSubtitle>
            <IonCardSubtitle>E0123456</IonCardSubtitle>
          </div>
          <div className="flex items-center">
            <IonCardSubtitle className="flex flex-col -ml-3">
              <IonButton size="small" fill="clear">
                {/* TODO: disable the button if the user doesn't have telegram handle */}
                <IonIcon icon={paperPlaneOutline} />
              </IonButton>
              <IonButton size="small" fill="clear">
                <IonIcon icon={mailOutline} />
              </IonButton>
            </IonCardSubtitle>
            <Tag color="primary" label="Junior" />
            {isAdmin && (
              <div className="flex flex-col items-center m-1">
                <p>Attended</p>
                <IonCheckbox
                  slot="end"
                  className="m-0"
                  checked={didAttend}
                  onIonChange={() => setDidAttend(!didAttend)}
                ></IonCheckbox>
              </div>
            )}
          </div>
        </div>
      </IonCardHeader>
    </IonCard>
  );
}

export default SignUpPersonCard;
