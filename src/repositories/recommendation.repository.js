import pool from '../database.js';

async function insert(recommendationData) {
  try {
    const result = await pool.query(
      'INSERT INTO recommendations (name, link) VALUES ($1, $2) RETURNING id;',
      [recommendationData.name, recommendationData.youtubeLink]
    );

    return result.rows[0].id;
  } catch (error) {
    console.log(error);
  }
}

export { insert };
