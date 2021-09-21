import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonChip,
  IonLabel,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonList,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

import SearchBar from "../Components/SearchBar";
import Tag from "../Components/Tag";

import { StrippedGroup } from "../types/Group";
import { Category } from "../types/Category";
import groupPlaceholder from "../resources/group-placeholder.jpg";

function ExploreGroups() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState<StrippedGroup[]>([]);
  const [displayedGroups, setDisplayedGroups] = useState<StrippedGroup[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.slotify.club/api/v1/groups/categories/?format=json"
      ).then((res) => res.json()),
      fetch("https://api.slotify.club/api/v1/groups/").then((res) =>
        res.json()
      ),
    ])
      .then(([categoriesData, groupsData]) => {
        setCategories(categoriesData.results);
        setGroups(groupsData.results);
        setDisplayedGroups(groupsData.results);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!selectedCategories.length) {
      setDisplayedGroups(groups);
    } else {
      setDisplayedGroups(groupsInSelectedCategories());
    }
    // eslint-disable-next-line
  }, [selectedCategories, groups]);

  function onTapCategory(categoryId: number) {
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
      selectedCategories.includes(group.category.id)
    );
  }

  return (
    <Fragment>
      <IonList>
        <div>
          <SearchBar onSearch={searchGroups} />
        </div>

        <div className="whitespace-nowrap overflow-x-scroll py-2 mx-2">
          {categories.map((category, idx) => {
            return (
              <Tag
                key={idx}
                color={
                  selectedCategories.includes(category.id)
                    ? "primary"
                    : undefined
                }
                label={category.name}
                className="whitespace-nowrap"
                onClick={() => onTapCategory(category.id)}
              />
            );
          })}
        </div>
      </IonList>

      <IonContent>
        {displayedGroups.length ? (
          displayedGroups.map((group, idx) => {
            return (
              <IonCard className="explore-group-card" key={idx}>
                <div className="explore-group-card-img-div">
                  <img
                    className="explore-group-card-img"
                    alt="Group"
                    src={group.banner_url ?? groupPlaceholder}
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
                      <IonLabel color="primary">{group.category.name}</IonLabel>
                    </IonChip>
                  </IonCardContent>
                </div>
              </IonCard>
            );
          })
        ) : (
          <div className="p-2">
            <Link to="/group/create">
              <IonChip
                color="primary"
                className="border-2 border-indigo-500 border-dashed h-32 w-full m-auto"
              >
                <div className="flex flex-col items-center w-full">
                  <IonIcon size="large" icon={addOutline} className="p-2" />
                  <p className="text-lg text-center w-full">
                    Can't find a group? Create one!
                  </p>
                </div>
              </IonChip>
            </Link>
          </div>
        )}
      </IonContent>
    </Fragment>
  );
}

export default ExploreGroups;
