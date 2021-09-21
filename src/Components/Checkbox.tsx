import { CheckboxChangeEventDetail } from "@ionic/core";
import { IonCheckbox, IonIcon, IonItem, IonLabel } from "@ionic/react";

type CheckboxProps = {
  outline?: boolean;
  color?: string;
  icon?: string;
  label?: string;
  errorValue?: string;
  checked?: boolean;
  onCheckChange?: (value: boolean) => void;
  [others: string]: any;
};

const Checkbox: React.FC<CheckboxProps> = ({
  outline = false,
  color,
  icon,
  label,
  errorValue,
  checked,
  onCheckChange,
  ...others
}) => {
  function onChange(event: CustomEvent<CheckboxChangeEventDetail>) {
    const val = event.detail.checked as boolean;
    if (onCheckChange) {
      onCheckChange(val ?? false);
    }
  }
  return (
    <div className="m-3">
      <IonItem
        className={`${outline ? "border-gray-200 border-2 rounded-xl" : ""}`}
      >
        <div className="flex items-center">
          <IonIcon slot="start" color={color} icon={icon} className="mr-2" />
          <IonLabel color={color}>{label}</IonLabel>
        </div>

        <IonCheckbox
          slot="end"
          className="m-0"
          checked={checked}
          onIonChange={onChange}
          {...others}
        ></IonCheckbox>
      </IonItem>
      {errorValue && (
        <p className="text-left mx-1 text-red-500 text-sm italic">
          * {errorValue}
        </p>
      )}
    </div>
  );
};

Checkbox.defaultProps = {
  type: undefined,
  outline: false,
  errorValue: undefined,
};

export default Checkbox;
