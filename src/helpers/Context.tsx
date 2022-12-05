import React from "react";
import { useState, createContext } from "react";

type PersonData = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: [string];
  species: [string];
  vehicles: [string];
  starships: [string];
  created: string;
  edited: string;
  url: string;
};

type PersonContextType = {
  personNumber: PersonData | number;
  setPersonNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const PersonContext = createContext<null | PersonContextType>(null);

type Props = {
  children: React.ReactNode;
};

const PersonAppProvider = ({ children }: Props) => {
  const [personNumber, setPersonNumber] = useState(1);
  return (
    <PersonContext.Provider value={{ personNumber, setPersonNumber }}>
      {children}
    </PersonContext.Provider>
  );
};

export default PersonAppProvider;
