import pool from './db.js';

async function getIntegration() {
  const result = await pool.query(
    "SELECT provider, base_url, settings, is_active FROM api_integrations WHERE provider = 'nova_poshta'",
  );

  const api_key = process.env.NOVA_POSHTA_API_KEY;

  if (result.rows.length === 0) {
    throw new Error('Integration "nova_poshta" not found');
  }

  const row = result.rows[0];

  if (!row.is_active) {
    throw new Error('Integration "nova_poshta" is disabled');
  }

  if (!api_key) {
    throw new Error('API key for "nova_poshta" is not configured');
  }

  return {
    provider: row.provider,
    apiKey: api_key,
    baseUrl: row.base_url,
    settings: row.settings,
    isActive: row.is_active,
  };
}

export default getIntegration;
