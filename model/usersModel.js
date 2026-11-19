import pool from './db.js';

export async function getAllUsers() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

export async function getUserByGithubId(githubId) {
  const result = await pool.query('SELECT * FROM users WHERE github_id = $1', [githubId]);
  return result.rows[0];
}

export async function   deleteUserById(userId) {
  const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}

export async function upsertUser(user) {
  const { githubId, name, email, avatarUrl } = user;
  const result = await pool.query(
    `INSERT INTO users (github_id, name, email, avatar_url)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (github_id) DO UPDATE
     SET name = EXCLUDED.name,
         email = EXCLUDED.email,
         avatar_url = EXCLUDED.avatar_url
     RETURNING *`,
    [githubId, name, email, avatarUrl]
  );
  return result.rows[0];
}