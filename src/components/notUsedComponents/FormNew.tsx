import React from "react";
import { useState, useContext, useEffect } from "react";

import axios, { AxiosError } from "axios";

import Input from "./Input";
import { PersonContext } from "../../helpers/Context";

const url = "https://example/.";

export type StarWarsData = [
  { name: string },
  { created: string },
  { vehicles: string[] }
];
export type values = {
  login: string;
  password: string;
  email: string;
  phone: string;
  checkbox: boolean;
};
export type validValues = {
  email: boolean;
  phone: boolean;
  checkbox: boolean;
};
export type UserData = {
  id: number;
  name: string;
  type: string;
  label: string;
  pattern?: string;
  errorMessage?: string;
  required: boolean;
  checked?: boolean;
};
const FormNew = () => {
  const dataContext = useContext(PersonContext);
  console.log("data from context", dataContext?.personNumber);
  const [values, setValues] = useState<values>({
    login: "",
    password: "",
    email: "",
    phone: "",
    checkbox: false,
  });
  const [valid, setValid] = useState<validValues>({
    email: false,
    phone: false,
    checkbox: false,
  });
  const [star_wars_data, setStarWarsData] = useState<StarWarsData>();
  const [success, setSuccess] = useState<boolean>(false);
  const title = "formularz rejestracyjny";

  const inputs = [
    {
      id: 1,
      name: "login",
      type: "text",
      label: "Login",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Hasło",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      label: "E-mail",
      errorMessage: "Nieprawidłowy format adresu e-mail",
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "tel",
      label: "Numer telefonu",
      pattern: "(?<!w)((?(+|00)?48)?)?[ -]?d{3}[ -]?d{3}[ -]?d{3}(?!w)",
      errorMessage: "Nieprawidłowy numer telefonu",
      required: true,
    },
    {
      id: 5,
      name: "checkbox",
      type: "checkbox",
      label: "Akceptuję Regulamin",
      checked: values.checkbox,
      errorMessage: "Wymagana akceptacja regulaminu!",
      required: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("DAAAANE FORMAA", values, star_wars_data);
    console.log(e.target);
    try {
      const response = await axios.post(url, {
        values,
        star_wars_data,
      });
      console.log("response.data", response.data);
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this??
      setValues({
        login: "",
        password: "",
        email: "",
        phone: "",
        checkbox: false,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onChange = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.name, e.currentTarget.value);
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    console.log("vaaaalues", values);
  };

  const urlPerson = "https://swapi.py4e.com/api/people/";
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios(
          `${urlPerson}${dataContext?.personNumber}/`
        );
        const data = response.data;
        const { name, created, vehicles } = data;
        setStarWarsData([{ name }, { created }, { vehicles }]);
      } catch (error) {
        const err = error as AxiosError;
        console.log("error - sth went wrong", err.response);
      }
    };
    fetchPerson();
  }, [dataContext]);

  console.log("star warssss outside", star_wars_data);
  return (
    <section className="form">
      <h2 className="form__title">{title.toLocaleUpperCase()}</h2>
      <form className="form__container" onSubmit={handleSubmit} noValidate>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onChange={onChange}
            data-valid={valid}
          />
        ))}
        <div className="form__btn-container">
          <button
            className="form__btn btn"
            disabled={
              !valid.email || !valid.phone || !valid.phone ? true : false
            }
          >
            zapisz
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormNew;
