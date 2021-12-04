import pool from '../database.js';

async function insert(recommendationData) {
  const result = await pool.query(
    'INSERT INTO recommendations (name, link) VALUES ($1, $2) RETURNING id;',
    [recommendationData.name, recommendationData.youtubeLink]
  );

  return result.rows[0];
}

async function findByLink(recommendationLink) {
  const result = await pool.query(
    'SELECT * FROM recommendations WHERE link = $1',
    [recommendationLink]
  );

  return result.rows;
}

async function findById(recommendationId) {
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

async function getScore(recommendationId) {
  const result = await pool.query(
    'SELECT recommendations.id, recommendations.name, recommendations.link AS "youtubeLink", (COUNT(DISTINCT upvotes.id) - COUNT(DISTINCT downvotes.id)) AS score FROM recommendations LEFT JOIN upvotes ON recommendations.id=upvotes.recommendation_id LEFT JOIN downvotes ON recommendations.id=downvotes.recommendation_id WHERE recommendations.id = $1 GROUP BY recommendations.id;',
    [recommendationId]
  );

  return result.rows[0];
}

async function insertDownvote(recommendationId) {
  await pool.query('INSERT INTO downvotes (recommendation_id) VALUES ($1);', [
    recommendationId,
  ]);
}

async function deleteRecommendation(recommendationId) {
  await pool.query('DELETE FROM recommendations WHERE id = $1;', [
    recommendationId,
  ]);
}

async function getRandom() {
  const result = await pool.query(
    'SELECT recommendations.id, recommendations.name, recommendations.link AS "youtubeLink", (COUNT(DISTINCT upvotes.id) - COUNT(DISTINCT downvotes.id)) AS score FROM recommendations LEFT JOIN upvotes ON recommendations.id=upvotes.recommendation_id LEFT JOIN downvotes ON recommendations.id=downvotes.recommendation_id  GROUP BY recommendations.id ORDER BY RANDOM() LIMIT 100;'
  );

  return result.rows;
}

export {
  insert,
  findByLink,
  insertUpvote,
  findById,
  insertDownvote,
  getScore,
  deleteRecommendation,
  getRandom,
};
