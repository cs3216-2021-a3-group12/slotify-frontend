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
  IonMenuToggle,
} from "@ionic/react";
import {
  home,
  personCircleOutline,
  searchOutline,
  logOutOutline,
} from "ionicons/icons";

function SideMenu() {
  return (
    <IonMenu menuId="side-menu" contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/home">
              <IonIcon icon={home} slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem routerLink="/explore">
              <IonIcon icon={searchOutline} slot="start" />
              <IonLabel>Explore</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile">
              <IonIcon icon={personCircleOutline} slot="start" />
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem href="/login">
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export const MenuButton = ({ ...props }) => (
  <IonButtons {...props}>
    <IonMenuButton slot="start" />
  </IonButtons>
);

export default SideMenu;
