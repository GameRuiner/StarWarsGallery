import React, { useCallback } from "react";

export const CharacterItem = ({ character, onCharacterSelection }) => {
  const handleClick = useCallback((ch) => {
    onCharacterSelection(ch);
  }, [onCharacterSelection]);

  return (
    <li className="clickable-element" onClick={() => handleClick(character)} >
      {character.name}
    </li>
  );
};
