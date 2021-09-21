import {
  IonButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { addOutline, timeOutline } from "ionicons/icons";
export enum SlotStatus {
  Waitlist = "Waitlist",
  Signup = "Signup",
}

interface SlotProps {
  tag: string;
  remainingSlots: number;
  status: SlotStatus;
}
function Slot({ tag, remainingSlots, status }: SlotProps): JSX.Element {
  return (
    <IonItem
      color={`${status === SlotStatus.Waitlist ? "light" : "success"}`}
      className="rounded-lg m-2"
    >
      <IonGrid>
        <IonRow>
          <IonLabel className="font-bold capitalize">{tag}</IonLabel>
        </IonRow>
        <IonRow>
          <IonLabel className="text-xs">
            Remaining slots: {remainingSlots}
          </IonLabel>
        </IonRow>
      </IonGrid>
      <IonButton slot="end" className="w-32">
        {status}
        <IonIcon
          slot="start"
          icon={status === SlotStatus.Signup ? addOutline : timeOutline}
        />
      </IonButton>
    </IonItem>
  );
}

export default Slot;
