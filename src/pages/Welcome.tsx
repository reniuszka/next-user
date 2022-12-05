import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Person from "../components/Person";
import { getPeople } from "../utils/api.js";

const Welcome = () => {
  const loaderData = useLoaderData();
  return (
    <div>
      <nav className="nav">
        <h4 className="author">Renata Diurczak</h4>
        <Link to="/register" className="btn btn-register">
          formularz rejestracyjny
        </Link>
      </nav>
      <Person peopleCounter={loaderData} />
    </div>
  );
};

export default Welcome;

export function loader() {
  return getPeople();
}
