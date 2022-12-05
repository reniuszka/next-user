import React from "react";
import { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { PersonContext } from "../helpers/Context";

const url = "https://example/.";

export type StarWarsData = [
  { name: string },
  { created: string },
  { vehicles: string[] }
];

const emailRegex = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  "gm"
);
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const Form = () => {
  const dataContext = useContext(PersonContext);

  const [login, setLogin] = useState<string | null>(null);

  const [password, setPassword] = useState<string | null>(null);

  const [email, setEmail] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const [phone, setPhone] = useState<string | null>(null);
  const [validPhone, setValidPhone] = useState<boolean>(false);

  const [accept, setAccept] = useState<boolean>(false);
  const [validAccept, setValidAccept] = useState<boolean>(false);
  const [redAccept, setRedAccept] = useState<boolean | null>(null);

  const [buttonValid, setButtonValid] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean | null>(null);
  const [star_wars_data, setStarWarsData] = useState<StarWarsData>();

  const title = "formularz rejestracyjny";

  useEffect(() => {
    if (email) {
      const result = emailRegex.test(email);
      setValidEmail(!!result);
    }
  }, [email]);

  useEffect(() => {
    if (phone) {
      const result = phoneRegex.test(phone);
      setValidPhone(!!result);
    }
  }, [phone]);

  useEffect(() => {
    if (validEmail && validPhone && validAccept) {
      setButtonValid(true);
    }
  }, [validEmail, validPhone, validAccept, buttonValid]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (buttonValid) {
      try {
        const response = await axios.post(url, {
          login,
          password,
          email,
          phone,
          star_wars_data,
        });
        console.log("response.data", response.data);
      } catch (error) {
        console.log("error", error);
      }
      setErrorMsg(false);
    } else {
      console.log("uzupelnij all pola");
      setErrorMsg(true);
    }
  };

  return (
    <main className="form">
      <div>
        <h2 className="form__title">{title.toLocaleUpperCase()}</h2>
        <form className="form__container" onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <label htmlFor="login" className="form__label">
              Login:
            </label>
            <input
              type="text"
              className="form__input"
              id="login"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLogin(e.currentTarget.value)
              }
              autoComplete="off"
              required
            />
          </div>

          <div className="form__row">
            <label htmlFor="password" className="form__label">
              Hasło:
            </label>
            <input
              type="password"
              className="form__input"
              id="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              autoComplete="off"
              required
            />
          </div>

          <div className="form__row">
            <label htmlFor="email" className="form__label">
              E-mail:
            </label>
            <input
              type="email"
              className={
                !validEmail && email ? "form__input--notvalid" : "form__input"
              }
              id="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
              autoComplete="off"
              required
            />
            <span
              className={
                (!!errorMsg && !validEmail) || (!validEmail && email)
                  ? "form__error"
                  : "form__error--nondisplay"
              }
            >
              Nieprawidłowy format adresu e-mail
            </span>
          </div>

          <div className="form__row">
            <label htmlFor="tel" className="form__label">
              Numer telefonu:
            </label>
            <input
              type="text"
              className={
                !validPhone && phone ? "form__input--notvalid" : "form__input"
              }
              id="tel"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.currentTarget.value)
              }
              autoComplete="off"
              required
            />
            <span
              className={
                (!!errorMsg && !validPhone) || (!validPhone && phone)
                  ? "form__error"
                  : "form__error--nondisplay"
              }
            >
              Nieprawidłowy numer telefonu
            </span>
          </div>

          <div className="form__row form__row--checkbox">
            <label
              htmlFor="checkbox"
              className="form__label form__label--checkbox"
            >
              <input
                type="checkbox"
                className="form__checkbox"
                id="checkbox"
                checked={accept}
                onChange={() => {
                  setAccept((prevAccept) => !prevAccept);
                  setValidAccept((prevValidAccept) => !prevValidAccept);
                  setRedAccept((prevRedAccept) => !prevRedAccept);
                }}
                required
              />
              Akceptuje Regulamin
              <span
                className={
                  !!errorMsg && !redAccept
                    ? "form__new-check red"
                    : "form__new-check"
                }
              ></span>
              <span
                className={
                  (!!errorMsg && !accept) || (!validAccept && accept)
                    ? "form__error"
                    : "form__error--nondisplay"
                }
              >
                Wymagana akceptacja regulaminu!
              </span>
            </label>
          </div>
          <div className="form__btn-container">
            <button className="form__btn btn">zapisz</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Form;
