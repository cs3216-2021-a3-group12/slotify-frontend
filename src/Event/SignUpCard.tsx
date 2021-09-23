import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import SignUpPersonCard from "./SignUpPersonCard";
import { AdminSlot } from "../types/EventSignUp";

interface SignUpCardProps {
  slot: AdminSlot;
  isAdmin: boolean;
}

function SignUpCard(props: SignUpCardProps) {
  const { isAdmin, slot } = props;

  return (
    <IonCard className="rounded-2xl text-left my-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-end p-4">
          <IonCardTitle>{slot.tag.tag_name}</IonCardTitle>
          <IonCardSubtitle>
            Remaining slots: {slot.available_slot_count}
          </IonCardSubtitle>
        </div>
        <div>
          <IonCardSubtitle className="px-5">Signed up</IonCardSubtitle>
          {slot.signups.confirmed_signups
            .filter((signUp) => {
              return signUp.is_confirmed;
            })
            .map((signUp) => {
              return (
                <SignUpPersonCard
                  isAdmin={isAdmin}
                  signUp={signUp}
                  user={signUp.user}
                />
              );
            })}
        </div>
        <div>
          <IonCardSubtitle className="px-5">Waiting list</IonCardSubtitle>
          {slot.signups.pending_signups
            .filter((signUp) => {
              return !signUp.is_confirmed;
            })
            .map((signUp) => {
              return (
                <SignUpPersonCard
                  isAdmin={isAdmin}
                  signUp={signUp}
                  user={signUp.user}
                />
              );
            })}
        </div>
      </div>
    </IonCard>
  );
}

export default SignUpCard;
