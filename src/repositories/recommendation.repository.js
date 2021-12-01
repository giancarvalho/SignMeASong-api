import pool from '../database.js';

async function insert(recommendationData) {
  try {
    const result = await pool.query(
      'INSERT INTO recommendations (name, link) VALUES ($1, $2) RETURNING id;',
      [recommendationData.name, recommendationData.youtubeLink]
    );

    return result.rows[0];
  } catch (error) {
    return { isInvalid: true, errorCode: 500 };
  }
}

async function find(recommendationLink) {
  try {
    const result = await pool.query(
      'SELECT * FROM recommendations WHERE link = $1',
      [recommendationLink]
    );

    return result.rows;
  } catch (error) {
    return { isInvalid: true, errorCode: 500 };
  }
}

export { insert, find };
