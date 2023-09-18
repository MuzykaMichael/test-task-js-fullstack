import { db } from "../db.js";

export const getAllHeroes = async (req, res, next) => {
  const id = req.params.id;
  let limit = 5;
  switch (id) {
    case 1:
      await db.query(
        `SELECT * FROM database.superheroes LIMIT 5`,
        (err, data) => {
          if (err) res.json(err.code);
          // console.log(data.rowDataPacket)
          res.json(data);
        }
      );
      break;

    case 2:
      await db.query(
        `SELECT * FROM database.superheroes LIMIT 5 OFFSET ${limit}`,
        (err, data) => {
          if (err) res.json(err.code);
          // console.log(data.rowDataPacket)
          res.json(data);
        }
      );
      break;

    default:
      await db.query(
        `SELECT * FROM database.superheroes LIMIT 5 OFFSET ${(id - 1) * limit}`,
        (err, data) => {
          if (err) res.json(err.code);
          // console.log(data.rowDataPacket)
          res.json(data);
        }
      );
      break;
  }
};

export const getHeroById = async (req, res, next) => {
  const heroId = req.params.id;
  const q = "SELECT * FROM database.superheroes WHERE id=?";
  await db.query(q, [heroId], (err, data) => {
    if (err) res.json(err);
    return res.status(200).json(data);
  });
};

export const addHero = async (req, res, next) => {
  const q =
    "INSERT INTO `database`.`superheroes` (`nickname`, `real_name`, `origin_description`, `superpowers`, `catch_phraze`, `images`) VALUES (?);";
  const values = [
    req.body.nickname,
    req.body.real_name,
    req.body.origin_description,
    req.body.superpowers,
    req.body.catch_phraze,
    req.body.images,
  ];
  await db.query(q, [values], (err, data) => {
    if (err) res.json(err);
    return res.status(200).json("Hero was successfully added!");
  });
};

export const removeHero = async (req, res, next) => {
  const heroId = req.params.id;
  const q = "DELETE from database.superheroes WHERE id = ?";
  await db.query(q, [heroId], (err, data) => {
    if (err) res.json(err);
    return res.status(200).json("Hero was successfully deleted!");
  });
};

export const updateHero = async (req, res, next) => {
  const heroId = req.params.id;
  const q =
    "UPDATE database.superheroes SET `nickname`=?, `real_name`=IFNULL(?,real_name), `origin_description`=IFNULL(?,origin_description), `superpowers`=IFNULL(?,superpowers), `catch_phraze`=IFNULL(?,catch_phraze), `images`=IFNULL(?,images) WHERE id=?";
  const values = [
    req.body.nickname,
    req.body.real_name,
    req.body.origin_description,
    req.body.superpowers,
    req.body.catch_phraze,
    req.body.images,
  ];

  await db.query(q, [...values, heroId], (err, data) => {
    if (err) res.json(err);
    return res.status(200).json(data);
  });
};
