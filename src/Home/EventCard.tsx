import {
    IonCard,
    IonContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonTitle,
    IonCardTitle,
} from "@ionic/react";
import { timeOutline, locationOutline } from "ionicons/icons";

function EventCard() {
    return (
        <IonCard className="rounded-2xl w-full h-full">
            <div className="w-full h-3/5 flex flex-col items-stretch">
                <img
                    className="p-2 w-auto object-fill rounded-2xl"
                    src="https://picsum.photos/200"
                />
            </div>

            <IonContent className="h-2/5" scrollEvents={false} scrollY={false}>
                <IonCardHeader className="text-left px-2 py-0 truncate">
                    <IonCardTitle className="truncate text-base">
                        This is a long long long long event name
                    </IonCardTitle>
                    <IonCardSubtitle className="flex items-center">
                        <IonIcon icon={timeOutline} className="m-1" />
                        <span>Time</span>
                    </IonCardSubtitle>
                    <IonCardSubtitle className="flex items-center">
                        <IonIcon icon={locationOutline} className="m-1" />
                        <span>Location</span>
                    </IonCardSubtitle>
                </IonCardHeader>
            </IonContent>
        </IonCard>
    );
}

export default EventCard;
