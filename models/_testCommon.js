const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testFavoriteLeagueIds = [];
const testFavoriteCupIds = [];
const testFavoriteTeamIds = [
  { username: "u1", teamId: 998 }, 
  { username: "u2", teamId: 777 }
];

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM favorite_leagues");
  await db.query("DELETE FROM favorite_cups");
  await db.query("DELETE FROM favorite_teams");
  await db.query("DELETE FROM teams");

  await db.query(`
        INSERT INTO users(username, password, email, timezone)
        VALUES ('u1', $1, 'u1@email.com', 'Europe/Istanbul'),
               ('u2', $2, 'u2@email.com', 'America/New_York')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);  

  await db.query(`
      INSERT INTO teams
            (id, name, code, country, founded, national, logo_url, venue_id)
      VALUES 
            (777, 'Turkey', 'TUR', 'Turkey', 1923, true, 'https://media.api-sports.io/football/teams/777.png', 1968), 
            (998, 'Trabzonspor', 'TRA', 'Turkey', 1967, false, 'https://media.api-sports.io/football/teams/998.png', 1590), 
            (165, 'Borussia Dortmund', 'DOR', 'Germany', 1909, false, 'https://media.api-sports.io/football/teams/165.png', 702), 
            (47, 'Tottenham', 'TOT', 'England', 1882, false, 'https://media.api-sports.io/football/teams/47.png', 593)`);
  
  await db.query(`
        INSERT INTO favorite_teams (username, team_id)
        VALUES ('u1', 165), ('u2', 47)
  `);

  await db.query(`
        INSERT INTO favorite_leagues (username, league_id)
        VALUES ('u1', 78), ('u2', 140)
  `);

  await db.query(`
        INSERT INTO favorite_cups (username, cup_id)
        VALUES ('u1', 206), ('u2', 81)
  `);
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


module.exports = {
  commonBeforeAll, 
  commonBeforeEach, 
  commonAfterEach, 
  commonAfterAll
};
