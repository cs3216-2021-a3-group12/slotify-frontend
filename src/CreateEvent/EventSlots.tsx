import { IonItem, IonLabel } from "@ionic/react";
import NumberStepInput from "../Components/NumberStepInput";

type EventSlotsProps = {
  label?: string;
  subLabel?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  [others: string]: any;
};

const EventSlots: React.FC<EventSlotsProps> = ({
  label,
  subLabel,
  value,
  onValueChange,
  ...others
}) => {
  return (
    <IonItem>
      <div className="w-2/3">
        <IonLabel className="font-bold">{label}</IonLabel>
        <IonLabel className="text-xs text-gray-500">{subLabel}</IonLabel>
      </div>
      <div className="w-1/3">
        <NumberStepInput
          slot="end"
          value={value}
          onValueChange={onValueChange}
          {...others}
        />
      </div>
    </IonItem>
  );
};

export default EventSlots;
