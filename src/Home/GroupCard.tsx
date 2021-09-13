import {
    IonCard,
    IonContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonChip,
    IonLabel,
} from "@ionic/react";
import { timeOutline, locationOutline } from "ionicons/icons";

function GroupCard() {
    return (
        <IonCard className="rounded-2xl w-auto h-1/3 flex justify-between">
            <div className="h-full w-1/3">
                <img
                    className="h-full w-full p-2 object-fill rounded-2xl"
                    src="https://picsum.photos/200"
                />
            </div>

            <div className="w-2/3 flex flex-col justify-center p-3">
                <IonCardHeader className="w-full text-left p-0">
                    <IonCardSubtitle className="truncate">
                        Group name
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="text-left p-0">
                    <IonChip color="primary">
                        <IonLabel color="primary">Category</IonLabel>
                    </IonChip>
                </IonCardContent>
            </div>
        </IonCard>
    );
}

export default GroupCard;
