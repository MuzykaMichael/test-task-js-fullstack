import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { PaginationComponent } from "../PaginationComponent";

export const Heroes = () => {
  const [heroes, setHeroes] = useState([]);
  const location = useLocation().pathname.split("/")[1];
  const locationNumber = Number(location);
  useEffect(() => {
    const fetchAllHeroes = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/${locationNumber}`);
        setHeroes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllHeroes();
  }, [locationNumber]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3030/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Heroes">
      <h1>Superheroes Test Task</h1>
      <div className="heroes">
        {heroes.length > 1 &&
          heroes.map((hero) => {
            const imgArr = hero.images.split(",");
            return (
              <div className="hero" key={hero.id}>
                {<h2>{hero.nickname}</h2>}
                {imgArr.length > 2 ? (
                  <img src={imgArr[0]} width="200" height="300" alt="" />
                ) : (
                  <></>
                )}
                <button>
                  <Link to={`/hero/${hero.id}`}>Read More</Link>
                </button>
                <button onClick={() => handleDelete(hero.id)}>Delete</button>
              </div>
            );
          })}
        {heroes.length === 1 &&
          heroes.map((heroes) => {
            const imgArray = heroes.images.split(",");
            return (
              <div className="hero" key={heroes.id}>
                {<h2>{heroes.nickname}</h2>}
                {imgArray.length > 2 ? (
                  <img src={imgArray[0]} width="200" height="300" alt="" />
                ) : (
                  <></>
                )}
                <button>
                  <Link to={`/hero/${heroes.id}`}>Read More</Link>
                </button>
                <button onClick={() => handleDelete(heroes.id)}>Delete</button>
              </div>
            );
          })}
      </div>
      <PaginationComponent location={locationNumber} />
      <button>
        <Link to={"/add"}>Add New Hero</Link>
      </button>
    </div>
  );
};
