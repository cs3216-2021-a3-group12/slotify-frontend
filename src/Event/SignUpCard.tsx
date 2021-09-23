import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import SignUpPersonCard from "./SignUpPersonCard";
import { AdminSlot } from "../types/EventSignUp";

interface SignUpCardProps {
  slot: AdminSlot;
}

function SignUpCard({ slot }: SignUpCardProps) {
  return (
    <IonCard className="rounded-2xl text-left my-0 p-2">
      <div className="flex flex-col">
        <div className="flex justify-between items-end p-4 pt-2">
          <IonCardTitle color="primary">{slot.tag.tag_name}</IonCardTitle>
          <IonCardSubtitle>
            Remaining slots: {slot.available_slot_count}
          </IonCardSubtitle>
        </div>
        {slot.signups.confirmed_signups.length > 0 && (
          <div>
            <p className="px-5 text-lg font-bold">Signed up</p>
            {slot.signups.confirmed_signups
              .filter((signUp) => {
                return signUp.is_confirmed;
              })
              .map((signUp) => {
                return <SignUpPersonCard signUp={signUp} user={signUp.user} />;
              })}
          </div>
        )}

        {slot.signups.pending_signups.length > 0 && (
          <div>
            <IonCardSubtitle className="px-5">Waiting list</IonCardSubtitle>
            {slot.signups.pending_signups.map((signUp) => {
              return <SignUpPersonCard signUp={signUp} user={signUp.user} />;
            })}
          </div>
        )}
      </div>
    </IonCard>
  );
}

export default SignUpCard;
