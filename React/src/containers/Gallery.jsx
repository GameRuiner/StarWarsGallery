import React, { Component } from "react";
import { SwapiService } from "../services";
import { CharacterFilter, GalleryList } from "../components";

export class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterDict: {},
      isLoading: true,
      characterLength: 0,
      charFilter: null,
    };
  }

  componentDidMount() {
    SwapiService.GetCharacters().then((value) => {
      this.setState({
        charactersDict: this.getCharacterDict(value),
        isLoading: false,
        characterLength: value.length,
      });
    });
  }

  handleFilterSelection(charFilter) {
    this.setState({
      charFilter: charFilter,
    });
  }

  getCharacterDict = (characters) => {
    characters.sort((a, b) => (a.name > b.name ? 1 : -1));
    const characterDict = {};
    for (const character of characters) {
      const firstLetter = character.name[0];
      if (characterDict[firstLetter] != null) {
        characterDict[firstLetter].push(character);
      } else {
        characterDict[firstLetter] = [character];
      }
    }
    return characterDict;
  };

  render() {
    return (
      <div className="gallery">
        {this.state.isLoading ? (
          "Loading..."
        ) : (
          <div>
            <div>All characters {this.state.characterLength}</div>
            <CharacterFilter
              characterDict={this.state.charactersDict}
              onFilterSelection={(c) => this.handleFilterSelection(c)}
            />
            <GalleryList
              characterDict={this.state.charactersDict}
              onCharacterSelection={this.props.onCharacterSelection}
              charFilter={this.state.charFilter}
            />
          </div>
        )}
      </div>
    );
  }
}
