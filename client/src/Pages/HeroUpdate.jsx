import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Form.scss";

export const HeroUpdate = () => {
  const [hero, setHero] = useState({
    nickname: null,
    real_name: null,
    origin_description: null,
    superpowers: null,
    catch_phraze: null,
    images: null,
  });

  const navigate = useNavigate();

  const location = useLocation();

  const heroId = location.pathname.split("/")[3];

  const handleChange = (e) => {
    setHero((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(heroId);
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/" + heroId,
        data: hero,
      });
      navigate("/1");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Update the Superhero</h1>
      <form className="form">
        <input
          type="text"
          placeholder="nickname"
          required
          onChange={handleChange}
          name="nickname"
        />
        <input
          type="text"
          placeholder="real name"
          onChange={handleChange}
          name="real_name"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="origin_description"
        />
        <input
          type="text"
          placeholder="superpowers"
          onChange={handleChange}
          name="superpowers"
        />
        <input
          type="text"
          placeholder="catch phraze"
          onChange={handleChange}
          name="catch_phraze"
        />
        <input
          type="text"
          placeholder="image links"
          onChange={handleChange}
          name="images"
        />
        <button onClick={handleClick}>Update Hero</button>
      </form>
      <p>
        If you want to add photos of your superhero, upload them on{" "}
        <a href="https://imgbb.com" target="_blank" rel="noreferrer">
          this website
        </a>
        . <br></br> Then copy the original links from the HTML code of the
        original image from the src attribute. To add 2 or more photos, they
        must be separated by commas.<br></br> Example of correct link for photo
        you can find{" "}
        <a
          href="https://i.ibb.co/PDwTCNt/information-notice-01.png"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <button>
        <Link to={"/1"}>Go back</Link>
      </button>
    </div>
  );
};
