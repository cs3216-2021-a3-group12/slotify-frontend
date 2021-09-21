import { MouseEventHandler } from "react";
import { IonChip, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";

type AddCardProps = {
  label?: string;
  onClick?: MouseEventHandler<HTMLIonChipElement>;
  [others: string]: any;
};

const AddCard: React.FC<AddCardProps> = ({ label, onClick, ...others }) => {
  return (
    <div {...others}>
      <IonChip
        onClick={onClick}
        color="primary"
        className="border-2 border-indigo-500 border-dashed h-full w-full m-auto"
      >
        <div className="flex flex-col items-center w-full">
          <IonIcon size="large" icon={addOutline} className="p-2" />
          {label && <p className="text-lg text-center w-full">{label}</p>}
        </div>
      </IonChip>
    </div>
  );
};

export default AddCard;
