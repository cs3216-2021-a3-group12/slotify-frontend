import { IonIcon, IonItem, IonLabel } from "@ionic/react";

type ProfileFieldProps = {
  icon: string;
  title: string;
  value: string;
};

const ProfileField: React.FC<ProfileFieldProps> = ({ icon, title, value }) => {
  return (
    <IonItem className="my-10 mx-12">
      <IonIcon slot="start" icon={icon} />
      <div className="flex flex-col">
        <IonLabel color="secondary" className="font-mono font-bold text-sm">
          {title}
        </IonLabel>
        <IonLabel className="text-lg">{value}</IonLabel>
      </div>
    </IonItem>
  );
};

export default ProfileField;
