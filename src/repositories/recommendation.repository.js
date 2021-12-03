import pool from '../database.js';

async function insert(recommendationData) {
  const result = await pool.query(
    'INSERT INTO recommendations (name, link) VALUES ($1, $2) RETURNING id;',
    [recommendationData.name, recommendationData.youtubeLink]
  );

  return result.rows[0];
}

async function findbyLink(recommendationLink) {
  const result = await pool.query(
    'SELECT * FROM recommendations WHERE link = $1',
    [recommendationLink]
  );

  return result.rows;
}

async function findbyId(recommendationId) {
  const result = await pool.query(
    'SELECT * FROM recommendations WHERE id = $1',
    [recommendationId]
  );

  return result.rows[0];
}

async function insertUpvote(recommendationId) {
  await pool.query('INSERT INTO upvotes (recommendation_id) VALUES ($1);', [
    recommendationId,
  ]);
}

export { insert, findbyLink, insertUpvote, findbyId };
