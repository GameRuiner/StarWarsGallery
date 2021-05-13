export class SwapiService {
  static async GetCharacters() {
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

  static async GetCharactersDetails(url, propertyName) {
    let response = await fetch(url);
    let data = await response.json();
    return data[propertyName];
  }
}
