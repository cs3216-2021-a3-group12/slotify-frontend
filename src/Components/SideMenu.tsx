import { menuController } from "@ionic/core";
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
} from "@ionic/react";
import { home } from "ionicons/icons";

function SideMenu() {
    return (
        <IonMenu side="start" menuId="side-menu" contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem href="/home">
                        <IonIcon icon={home} slot="start" />
                        <IonLabel>Home</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
}

export const openSideMenu = () => menuController.open();

export default SideMenu;
