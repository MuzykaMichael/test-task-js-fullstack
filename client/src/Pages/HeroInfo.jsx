import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { nanoid } from "nanoid";
import "../styles/HeroInfoStyles.scss";

export const HeroInfo = () => {
  const [heroInfo, setHeroInfo] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchHeroById = async (id) => {
      try {
        const res = await axios.get("http://localhost:3030/hero/" + id);
        setHeroInfo(res.data[0]);
        const imgString = `${res.data[0].images}`;
        const imgArr = imgString.split(",");
        setHeroImages(imgArr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHeroById(id);
  }, [id]);

  return (
    <div className="heroInfo">
      <h2>{heroInfo.nickname}</h2>
      <div className="heroImages">
        {heroImages.length > 2 ? (
          heroImages.map((img) => {
            return (
              <img src={img} key={nanoid()} alt="" width="200" height="300" />
            );
          })
        ) : (
          <div>No photos for this superhero :(</div>
        )}
      </div>
      <h3>Real name: {heroInfo.real_name}</h3>
      <p>Description: {heroInfo.origin_description}</p>
      <p>Superpowers: {heroInfo.superpowers}</p>
      <p>Catch Phraze: {heroInfo.catch_phraze}</p>
      <button>
        <Link to={`/update${location.pathname}`}>Update Hero</Link>
      </button>
      <button onClick={() => navigate("/1")}>Go Back</button>
    </div>
  );
};
