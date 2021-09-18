import { IonButton, IonIcon } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import React from "react";

type GroupDoneProps = {
  gotoGroup?: () => void;
  gotoHome?: () => void;
};

const GroupDone: React.FC<GroupDoneProps> = ({ gotoGroup, gotoHome }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <IonIcon icon={checkmarkCircle} color="primary" className="text-8xl" />
      <div className="mt-20 w-full">
        <IonButton onClick={gotoGroup} className="w-5/6">
          Go to group
        </IonButton>
        <IonButton onClick={gotoHome} className="w-5/6">
          Home
        </IonButton>
      </div>
    </div>
  );
};

export default GroupDone;
