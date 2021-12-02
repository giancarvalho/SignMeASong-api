import pool from '../database.js';

async function insert(recommendationData) {
  const result = await pool.query(
    'INSERT INTO recommendations (name, link) VALUES ($1, $2) RETURNING id;',
    [recommendationData.name, recommendationData.youtubeLink]
  );

  return result.rows[0];
}

async function find(recommendationLink) {
  const result = await pool.query(
    'SELECT * FROM recommendations WHERE link = $1',
    [recommendationLink]
  );

  return result.rows;
}

export { insert, find };
