import { IonSegmentButton, IonLabel } from "@ionic/react";

interface GroupViewSegmentProps {
  value: string;
  selected: string;
  children?: React.ReactNode;
}

function GroupViewSegmentButton({
  value,
  selected,
  children,
}: GroupViewSegmentProps) {
  return (
    <IonSegmentButton
      className={`${selected === value && "text-indigo-500"}`}
      value={value}
    >
      <IonLabel>{children}</IonLabel>
    </IonSegmentButton>
  );
}

export default GroupViewSegmentButton;
