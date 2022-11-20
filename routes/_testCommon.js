"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Local = require("../models/local");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM teams");

  await User.register({
    username: "u1",
    email: "user1@user.com",
    password: "password1",
    continent: "Europe",
    city: "Athens",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    email: "user2@user.com",
    password: "password2",
    continent: "Europe",
    city: "Berlin",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    email: "user3@user.com",
    password: "password3",
    continent: "Europe",
    city: "Paris",
    isAdmin: false,
  });

  await Local.addTeam({
    id: 549, 
    name: "Beşiktaş", 
    code: "BJK", 
    country: "Türkiye", 
    founded: 1903, 
    national: false, 
    logoUrl: "https://media.api-sports.io/football/teams/549.png", 
    venueId: 1578
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
};
