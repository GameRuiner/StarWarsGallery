//:: App

App();

async function App() {
  const allCharacters = await GetCharacters();

  document.getElementById("loading_status").hidden = true;

  const app = document.getElementById("app");
  const appContainer = document.createElement("div");
  appContainer.className = "app-container";

  appContainer.appendChild(Gallery(allCharacters));
  appContainer.appendChild(Details());
  app.appendChild(appContainer);
}

//:: Gallery container

function Gallery(characters) {
  characters.sort((a, b) => (a.name > b.name ? 1 : -1));
  const characterDict = {};
  for (character of characters) {
    const firstLetter = character.name[0];
    if (characterDict[firstLetter] != null) {
      characterDict[firstLetter].push(character);
    } else {
      characterDict[firstLetter] = [character];
    }
  }

  const gallery = document.createElement("div");
  gallery.className = "gallery";

  const charactersCount = document.createElement("div");
  charactersCount.innerHTML = `<p> All characters (${characters.length}) </p>`;
  gallery.appendChild(charactersCount);

  const filterelement = characterFilter(characterDict);
  gallery.appendChild(filterelement);

  gallery.appendChild(galleryList(characterDict));

  return gallery;
}

function Details() {
  const details = document.createElement("div");
  details.className = "details";
  details.innerHTML = "<h2> Details </h2>";
  const characterDetails = document.createElement("div");
  characterDetails.className = "character-details";
  details.appendChild(characterDetails);
  return details;
}

//:: Components

function galleryList(characterDict, filterLetter = null) {
  const galleryListElement = document.createElement("div");
  galleryListElement.className = "gallery-list";

  for (letter in characterDict) {
    if (filterLetter != null && filterLetter != letter) {
      continue;
    }
    const letterBlock = document.createElement("div");
    const blockList = document.createElement("ul");
    for (character of characterDict[letter]) {
      blockList.appendChild(characterItem(character));
    }
    letterBlock.innerHTML = `<h2>${letter}</h2>`;
    letterBlock.appendChild(blockList);
    galleryListElement.appendChild(letterBlock);
  }

  return galleryListElement;
}

function characterFilter(characterDict) {
  const filterElement = document.createElement("div");
  filterElement.className = "character-filter";

  const filterList = document.createElement("div");
  filterList.className = "filter-list";

  Object.entries(characterDict).forEach((element) => {
    const filterItem = document.createElement("li");
    filterItem.className = "filter-list-item clickable-element";
    filterItem.innerHTML = `${element[0]}`;
    filterItem.addEventListener("click", () =>
      galleryFilter(element[0], characterDict)
    );
    filterList.appendChild(filterItem);
  });

  const filterItem = document.createElement("li");
  filterItem.className = "filter-list-item clickable-element";
  filterItem.innerHTML = `All`;
  filterItem.addEventListener("click", () =>
    galleryFilter(null, characterDict)
  );
  filterList.appendChild(filterItem);

  filterElement.appendChild(filterList);
  return filterElement;
}

function characterItem(character) {
  const characterElement = document.createElement("li");
  characterElement.innerHTML = `${character.name}`;
  characterElement.addEventListener("click", () =>
    showCharacterDetails(character)
  );
  characterElement.className = "clickable-element";
  return characterElement;
}

//:: Click hanlders

function galleryFilter(letter, characterDict) {
  const detailsElement = document.getElementsByClassName("gallery-list")[0];
  detailsElement.remove();
  const gallery = document.getElementsByClassName("gallery")[0];
  gallery.appendChild(galleryList(characterDict, letter));
}

async function showCharacterDetails(character) {
  const detailsElement = document.getElementsByClassName(
    "character-details"
  )[0];
  const homeworld = await GetCharactersDetails(character.homeworld, "name");
  const vehicles = [];
  for (vehicle_url of character.vehicles) {
    vehicles.push(await GetCharactersDetails(vehicle_url, "name"));
  }
  detailsElement.innerHTML = `
        <ul>
          <li> Name: ${character.name} </li>
          <li> Birth year: ${character.birth_year} </li>
          <li> Homeworld: ${homeworld} </li>
          ${
            vehicles.length == 0 ? "" : `<li> Vehicles: ${vehicles.join(", ")}`
          }</li>
        </ul>
    `;
}

//:: Services

async function GetCharacters() {
  let allCharacters = [];
  let url = "https://swapi.dev/api/people/?format=json";
  do {
    let response = await fetch(url);
    let data = await response.json();
    allCharacters = allCharacters.concat(data.results);
    url = data.next;
  } while (url != null);
  return allCharacters;
}

async function GetCharactersDetails(url, propertyName) {
  let response = await fetch(url);
  let data = await response.json();
  return data[propertyName];
}
