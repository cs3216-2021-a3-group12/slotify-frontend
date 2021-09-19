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
import { Link } from "react-router-dom";

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
          <Link to="/home">
            <IonItem>
              <IonIcon icon={home} slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </Link>
          <Link to="/explore">
            <IonItem>
              <IonIcon icon={searchOutline} slot="start" />
              <IonLabel>Explore</IonLabel>
            </IonItem>
          </Link>
          <Link to="/profile">
            <IonItem>
              <IonIcon icon={personCircleOutline} slot="start" />
              <IonLabel>Profile</IonLabel>
            </IonItem>
          </Link>
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
