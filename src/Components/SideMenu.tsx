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
    IonButtons,
    IonMenuButton,
} from "@ionic/react";
import { home, personCircleOutline, searchOutline } from "ionicons/icons";

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
                    <IonItem href="/explore">
                        <IonIcon icon={searchOutline} slot="start" />
                        <IonLabel>Explore</IonLabel>
                    </IonItem>
                    <IonItem href="/profile">
                        <IonIcon icon={personCircleOutline} slot="start" />
                        <IonLabel>Profile</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
}

const openSideMenu = () => menuController.open();

export const MenuButton = ({ ...props }) => (
    <IonButtons {...props}>
        <IonMenuButton autoHide={false} onClick={openSideMenu} />
    </IonButtons>
);

export default SideMenu;
