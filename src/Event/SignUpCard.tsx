import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { useEffect, useState } from "react";
import SignUpPersonCard from "./SignUpPersonCard";
import { EventSignUp } from "../types/EventSignUp";

function SignUpCard({
  isAdmin,
  signUps,
  tagName,
}: {
  isAdmin: boolean;
  signUps: EventSignUp[];
  tagName: string;
}) {
  const [remainingSlots, setRemainingSlots] = useState(0);
  useEffect(() => {
    setRemainingSlots(0);
  }, []);

  return (
    <IonCard className="rounded-2xl text-left my-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-end p-4">
          <IonCardTitle>{tagName}</IonCardTitle>
          <IonCardSubtitle>Remaining slots: {remainingSlots}</IonCardSubtitle>
        </div>
        <div>
          <IonCardSubtitle className="px-5">Signed up</IonCardSubtitle>
          {signUps
            .filter((signUp) => {
              return signUp.is_confirmed;
            })
            .map((signUp) => {
              return <SignUpPersonCard isAdmin={isAdmin} signUp={signUp} />;
            })}
        </div>
        <div>
          <IonCardSubtitle className="px-5">Waiting list</IonCardSubtitle>
          {signUps
            .filter((signUp) => {
              return !signUp.is_confirmed;
            })
            .map((signUp) => {
              return <SignUpPersonCard isAdmin={isAdmin} signUp={signUp} />;
            })}
        </div>
      </div>
    </IonCard>
  );
}

export default SignUpCard;
