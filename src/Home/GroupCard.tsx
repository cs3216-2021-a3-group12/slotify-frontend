import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonLabel,
} from "@ionic/react";

export interface Group {
    id: string;
    name: string;
    categoryId: string;
    category: string;
    imgUrl: string;
}

function GroupCard({ group }: { group: Group }) {
    return (
        <IonCard className="rounded-2xl w-auto h-1/3 mt-3 flex justify-between">
            <div className="h-full w-1/3">
                <img
                    className="h-full w-full p-2 object-fill rounded-2xl"
                    alt="Group"
                    src={group.imgUrl}
                />
            </div>

            <div className="w-2/3 flex flex-col justify-center p-3">
                <IonCardHeader className="w-full text-left p-0">
                    <IonCardSubtitle className="truncate">
                        {group.name}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="text-left p-0">
                    <IonChip color="primary">
                        <IonLabel color="primary">{group.category}</IonLabel>
                    </IonChip>
                </IonCardContent>
            </div>
        </IonCard>
    );
}

export default GroupCard;
