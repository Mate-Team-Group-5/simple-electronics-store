import pool from './db.js';

async function getIntegration() {
  const result = await pool.query(
    "SELECT provider, api_key, base_url, settings, is_active FROM api_integrations WHERE provider = 'nova_poshta'",
  );

  if (result.rows.length === 0) {
    throw new Error('Integration "nova_poshta" not found');
  }

  const row = result.rows[0];

  if (!row.is_active) {
    throw new Error('Integration "nova_poshta" is disabled');
  }

  if (!row.api_key) {
    throw new Error('API key for "nova_poshta" is not configured');
  }

  return {
    provider: row.provider,
    apiKey: row.api_key,
    baseUrl: row.base_url,
    settings: row.settings,
    isActive: row.is_active,
  };
}

export default getIntegration;
