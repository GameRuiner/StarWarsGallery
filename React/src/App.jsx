import React, { useCallback, useState } from "react";

import { Gallery, Details } from "./containers";
import { AppLayout } from "./components";

export const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState();

  const handleCharacterSelection = useCallback((character) => {
    setSelectedCharacter(character);
  }, []);
  return (
    <div>
      <h2 className="app-title">Star Wars characters</h2>
      <AppLayout>
        <Gallery onCharacterSelection={handleCharacterSelection} />
        <Details selectedCharacter={selectedCharacter} />
      </AppLayout>
    </div>
  );
};
