import {
  IonButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import {
  addOutline,
  timeOutline,
  banOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { useState } from "react";
import { SlotDetails } from "../types/Event";
export enum SlotStatus {
  Waitlist = "Waitlist",
  Signup = "Signup",
}
import axios from "axios";

interface SlotProps {
  // tag: number;
  // remainingSlots: number;
  // status: SlotStatus;
  slotDetails: SlotDetails;
}

function Slot(slotProps: SlotProps): JSX.Element {
  const [slot, setSlot] = useState<SlotDetails>(slotProps.slotDetails);

  const toggleSignUp = () => {};

  return (
    <IonItem
      color={
        slot.is_signed_up
          ? slot.is_confirmed
            ? "success"
            : "warning"
          : "light"
      }
      className="rounded-lg m-2"
    >
      <IonGrid>
        <IonRow>
          <IonLabel className="font-bold capitalize">
            {slot.tag.tag_name}
          </IonLabel>
        </IonRow>
        <IonRow>
          <IonLabel className="text-xs">
            Remaining slots: {slot.available_slot_count}
          </IonLabel>
          <IonLabel className="text-xs">
            Waitlisted: {slot.pending_signup_count}
          </IonLabel>
        </IonRow>
      </IonGrid>
      <IonButton slot="end" className="w-32" disabled={!slot.is_eligible}>
        <IonIcon
          slot="start"
          icon={
            slot.is_signed_up
              ? slot.is_confirmed
                ? checkmarkCircleOutline
                : timeOutline
              : slot.is_eligible
              ? addOutline
              : banOutline
          }
        />
      </IonButton>
    </IonItem>
  );
}

export default Slot;
