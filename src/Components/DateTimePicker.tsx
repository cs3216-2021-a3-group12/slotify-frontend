import { DatetimeChangeEventDetail } from "@ionic/core";
import { IonDatetime, IonIcon, IonItem, IonLabel } from "@ionic/react";

type DateTimePickerProps = {
  outline?: boolean;
  color?: string;
  icon?: string;
  label?: string;
  errorValue?: string;
  value?: Date;
  onValueChange?: (value: Date) => void;
  [others: string]: any;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  outline = false,
  color,
  icon,
  label,
  errorValue,
  value,
  onValueChange,
  ...others
}) => {
  function onChange(event: CustomEvent<DatetimeChangeEventDetail>) {
    const text = event.detail.value as string;
    if (text !== undefined && onValueChange) {
      onValueChange(new Date(text));
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

        <IonDatetime
          slot="end"
          className="m-0"
          value={` ${value?.toDateString()} ${value?.toTimeString()}`}
          onIonChange={onChange}
          {...others}
        ></IonDatetime>
      </IonItem>
      {errorValue && (
        <p className="text-left mx-1 text-red-500 text-sm italic">
          * {errorValue}
        </p>
      )}
    </div>
  );
};

DateTimePicker.defaultProps = {
  type: undefined,
  outline: false,
  errorValue: undefined,
};

export default DateTimePicker;
