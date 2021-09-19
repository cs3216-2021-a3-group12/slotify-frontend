import { InputChangeEventDetail } from "@ionic/core";
import { IonButton, IonButtons, IonIcon, IonInput } from "@ionic/react";
import { removeOutline, addOutline } from "ionicons/icons";
import { useEffect } from "react";

type NumberStepInputProps = {
  step?: number;
  min?: number;
  max?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  [others: string]: any;
};

const NumberStepInput: React.FC<NumberStepInputProps> = ({
  step = 1,
  min,
  max,
  value,
  onValueChange,
  ...others
}) => {
  useEffect(() => {
    if (value === undefined || !onValueChange) return;

    if (min !== undefined && value - (step ?? 1) < min) onValueChange(min);
    if (max !== undefined && value + (step ?? 1) > max) onValueChange(max);
    // eslint-disable-next-line
  }, [min, max]);

  function onChange(event: CustomEvent<InputChangeEventDetail>) {
    const text = event.detail.value as string;
    if (text !== undefined && onValueChange && !isNaN(Number(text))) {
      onValueChange(Number(text));
    }
  }

  function onMinus() {
    if (value === undefined) return;
    if (min !== undefined && value - (step ?? 1) < min) return;
    if (onValueChange) {
      onValueChange(value - (step ?? 1));
    }
  }

  function onAdd() {
    if (value === undefined) return;
    if (max !== undefined && value + (step ?? 1) > max) return;
    if (onValueChange) {
      onValueChange(value + (step ?? 1));
    }
  }
  return (
    <div className="flex w-40 items-stretch h-9" {...others}>
      <IonButtons className="bg-indigo-600 rounded-l-3xl w-1/3">
        <IonButton className="w-full" onClick={onMinus}>
          <IonIcon icon={removeOutline} color="white" />
        </IonButton>
      </IonButtons>
      <IonInput
        className="border-indigo-600 border-2 text-center w-1/3"
        type="number"
        value={value}
        onIonChange={onChange}
      />
      <IonButtons className=" bg-indigo-600 rounded-r-3xl w-1/3">
        <IonButton className="w-full" onClick={onAdd} type="button">
          <IonIcon icon={addOutline} color="white" />
        </IonButton>
      </IonButtons>
    </div>
  );
};

export default NumberStepInput;
