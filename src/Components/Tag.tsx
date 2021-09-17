import { IonChip, IonLabel } from "@ionic/react";

type TagProps = {
  color?: string;
  label: string;
  [other: string]: any;
};

const Tag: React.FC<TagProps> = ({ color, label, ...props }) => {
  return (
    <IonChip color={color} {...props}>
      <IonLabel color={color}>{label}</IonLabel>
    </IonChip>
  );
};

export default Tag;
