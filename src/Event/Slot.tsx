import { IonButton, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";

export enum SlotStatus {
  Waitlisted = "Waitlisted",
  Confirmed = "Confirmed",
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
      color={`${status === SlotStatus.Waitlisted ? "light" : "success"}`}
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
      <IonButton slot="end">{status}</IonButton>
    </IonItem>
  );
}

export default Slot;
