import React from "react";
import { useEffect, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { FaCheckCircle, FaUserCheck } from "react-icons/fa";

import Loading from "./Loading";
import { PersonContext } from "../helpers/Context";

export type PersonData = {
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

const url = "https://swapi.py4e.com/api/people/";
const image = "https://picsum.photos/534/383?random=";

const Person = ({ peopleCounter }: any) => {
  const dataContext = useContext(PersonContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [defaultImage, setDefaultImage] = useState<string>(image);
  const [showPerson, setShowPerson] = useState<PersonData | null>(null);
  const { count } = peopleCounter;

  const getNextUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dataContext?.setPersonNumber(
      (prevPersonNumber: number) => prevPersonNumber + 1
    );
  };

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      try {
        if (dataContext?.personNumber! > count) {
          dataContext?.setPersonNumber((prevPersonNumber: number) => 1);
        }
        const response = await axios(`${url}${dataContext?.personNumber}/`);
        const data = response.data;
        setDefaultImage(`${image}${dataContext?.personNumber}`);
        setShowPerson(data);
      } catch (error) {
        const err = error as AxiosError;
        console.log("error - sth went wrong", err.response);
      }
      setLoading(false);
    };
    fetchPerson();
  }, [dataContext, count]);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="container">
      <div className="person__box">
        <div className="container__img">
          <img
            src={defaultImage}
            alt="the person profile"
            className="person__img"
          />
        </div>
        <div>
          {showPerson ? (
            <>
              <div className="person__data">
                <h2>{showPerson.name.substring(0, 15)}</h2>
                <div>
                  <span className="icon person__icon">
                    <FaUserCheck />
                  </span>
                  <span className="icon">
                    <FaCheckCircle />
                  </span>
                </div>
              </div>

              <div className="person__details">
                <p>age: {showPerson.birth_year}</p>
                <p>eye color: {showPerson.eye_color}</p>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <button onClick={getNextUser} className="btn">
        next user
      </button>
    </section>
  );
};

export default Person;
