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
import { useAuthState } from "../AuthContext";
import axios from "axios";

export enum SlotStatus {
  Waitlist = "Waitlist",
  Signup = "Signup",
}

interface SlotProps {
  slotDetails: SlotDetails;
}

function Slot(slotProps: SlotProps): JSX.Element {
  const [slot, setSlot] = useState<SlotDetails>(slotProps.slotDetails);
  const userDetails = useAuthState();

  const toggleSignUp = () => {
    const method = slot.is_signed_up ? "delete" : "post";
    axios({
      method: method,
      url: `/events/slots/${slot.slot_id}/signups`,
      headers: {
        Authorization: `Bearer ${userDetails.accessToken}`,
      },
    })
      .then((response) => {
        console.log("TOGGLE SIGNUP", response.data);
      })
      .then(() => {
        fetchUpdatedSlot();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const fetchUpdatedSlot = () => {
    axios
      .get(`/events/slots/${slot.slot_id}`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      })
      .then((response) => {
        console.log("GOT UPDATED SLOT", response.data);
        const updatedSlot = response.data as SlotDetails;
        setSlot(updatedSlot);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
      <IonButton
        slot="end"
        className="w-32"
        disabled={!slot.is_eligible}
        onClick={toggleSignUp}
      >
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
