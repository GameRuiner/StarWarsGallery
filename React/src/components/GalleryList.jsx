import React from "react";
import { CharacterItem } from "./CharacterItem";

export const GalleryList = ({
  characterDict,
  onCharacterSelection,
  charFilter,
}) => {
  return (
    <div className="gallery-list">
      {Object.entries(characterDict)
        .filter((letter) => (charFilter ? letter[0] === charFilter : true))
        .map((element) => (
          <div key={element[0]}>
            <h2>{element[0]}</h2>
            <ul>
              {element[1].map((character) => (
                <CharacterItem
                  character={character}
                  onCharacterSelection={onCharacterSelection}
                  key={character.name}
                />
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};
