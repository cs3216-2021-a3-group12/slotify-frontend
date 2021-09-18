import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonChip,
  IonLabel,
  IonCardTitle,
  IonContent,
} from "@ionic/react";
import { useState, useEffect, Fragment } from "react";
import { StrippedGroup } from "../types/Group";
import { Category } from "../types/Category";
import SearchBar from "./SearchBar";

export interface ExploreGroupsProps {}

function ExploreGroups() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState<StrippedGroup[]>([]);
  const [displayedGroups, setDisplayedGroups] = useState<StrippedGroup[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setGroups(testGroups);
    setDisplayedGroups(testGroups);
    setCategories(testCategories);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!selectedCategories.length) {
      setDisplayedGroups(groups);
    } else {
      setDisplayedGroups(groupsInSelectedCategories());
    }
    // eslint-disable-next-line
  }, [selectedCategories]);

  function onTapCategory(categoryId: string) {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((value) => value !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  }

  function searchGroups(text: string) {
    setDisplayedGroups(
      groupsInSelectedCategories().filter((group) =>
        Object.values(group).join(" ").includes(text)
      )
    );
  }

  function groupsInSelectedCategories() {
    return groups.filter((group) =>
      selectedCategories.includes(group.categoryId)
    );
  }

  return (
    <Fragment>
      <div>
        <SearchBar onSearch={searchGroups} />
      </div>

      <div className="whitespace-nowrap overflow-x-scroll py-2 mx-2">
        {categories.map((category) => {
          return (
            <IonChip
              color={
                selectedCategories.includes(category.id) ? "primary" : undefined
              }
              className="whitespace-nowrap"
              onClick={() => onTapCategory(category.id)}
            >
              <IonLabel>{category.name}</IonLabel>
            </IonChip>
          );
        })}
      </div>

      <IonContent>
        {displayedGroups.map((group) => {
          return (
            <IonCard className="explore-group-card">
              <div className="explore-group-card-img-div">
                <img
                  className="explore-group-card-img"
                  alt="Group"
                  src={group.imgUrl}
                />
              </div>

              <div className="explore-group-card-text-div">
                <IonCardHeader className="explore-group-card-header">
                  <IonCardTitle className="explore-group-card-name">
                    {group.name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="explore-group-card-content">
                  <IonChip color="primary">
                    <IonLabel color="primary">{group.category}</IonLabel>
                  </IonChip>
                </IonCardContent>
              </div>
            </IonCard>
          );
        })}
      </IonContent>
    </Fragment>
  );
}

export default ExploreGroups;

const testGroups = [
  {
    id: "id-1",
    name: "Group Name 1",
    categoryId: "cid-1",
    category: "Category 1",
    imgUrl: "https://picsum.photos/200",
    about: "This is About",
  },
  {
    id: "id-2",
    name: "Group Name 2",
    categoryId: "cid-2",
    category: "Category 2",
    imgUrl: "https://picsum.photos/200",
    about: "This is About",
  },
  {
    id: "id-2",
    name: "Group Name 2",
    categoryId: "cid-2",
    category: "Category 2",
    imgUrl: "https://picsum.photos/200",
    about: "This is About",
  },
  {
    id: "id-2",
    name: "Long long long long ong long long ong long long ong long long ong long long ong long long ong long long long name",
    categoryId: "cid-2",
    category: "Category 2",
    imgUrl: "https://picsum.photos/200",
    about: "This is About",
  },
  {
    id: "id-2",
    name: "Group Name 2",
    categoryId: "cid-2",
    category: "Category 2",
    imgUrl: "https://picsum.photos/200",
    about: "This is About",
  },
  {
    id: "id-2",
    name: "Group Name 2",
    categoryId: "cid-2",
    category: "Category 2",
    imgUrl: "https://picsum.photos/200",
    about: "This is About",
  },
];

const testCategories = [
  {
    id: "cid-1",
    name: "Category 1",
  },
  {
    id: "cid-2",
    name: "Category 2",
  },
  {
    id: "cid-3",
    name: "Category 3",
  },
  {
    id: "cid-4",
    name: "Category 4",
  },
  {
    id: "cid-5",
    name: "Category 5",
  },
  {
    id: "cid-6",
    name: "Category 6",
  },
];
