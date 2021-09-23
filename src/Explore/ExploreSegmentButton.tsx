import { IonSegmentButton, IonLabel } from "@ionic/react";

interface ExploreSegmentProps {
  value: string;
  selected: string;
  children?: React.ReactNode;
}

function ExploreSegmentButton({
  value,
  selected,
  children,
}: ExploreSegmentProps) {
  return (
    <IonSegmentButton
      className={`${selected === value && "text-indigo-500"}`}
      value={value}
    >
      <IonLabel>{children}</IonLabel>
    </IonSegmentButton>
  );
}

export default ExploreSegmentButton;
