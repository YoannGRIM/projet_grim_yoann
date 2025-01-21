const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const Users = db.users;
const Op = db.Sequelize.Op;

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

async function getUserByLogin(login) {
  try {
    const user = await Users.findOne({ where: { login: login } });
    return user ? user.toJSON() : null;
  } catch (error) {
    console.error('Error fetching user by login:', error);
    return null;
  }
}

async function getUserById(id) {
  try {
    const user = await Users.findByPk(id);
    return user ? user.toJSON() : null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

exports.login = async (req, res) => {
  const credentials = {
    login: req.body.login,
    password: req.body.password
  };

  try {
    const user = await getUserByLogin(credentials.login);

    if (!user || !await bcrypt.compare(credentials.password, user.password)) {
      return res.status(401).send({ message: 'Invalid login or password' });
    }

    const data = {
      id: user.id,
      name: user.nom,
      email: user.email
    };
    
    let accessToken = generateAccessToken(data);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    console.log(accessToken);

    res.send(data);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  const user = {
    id: uuidv4(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const existingUser = await getUserByLogin(user.login);
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await Users.create(user);

    const data = {
      id: newUser.id,
      name: newUser.nom,
      email: newUser.email
    };

    res.send(data);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

exports.update = async (req, res) => {
  try {
    const user = await getUserById(req.token.payload.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const updatedData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password
    };

    await Users.update(updatedData, { where: { id: user.id } });

    const updatedUser = await getUserById(user.id);

    const data = {
      id: updatedUser.id,
      nom: updatedUser.nom,
      prenom: updatedUser.prenom,
      email: updatedUser.email
    };

    res.send(data);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

exports.get = async (req, res) => {
  try {
    const user = await getUserById(req.token.payload.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const data = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email
    };

    res.send(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
}
