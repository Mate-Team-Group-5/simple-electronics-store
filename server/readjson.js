import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

async function readJSONFile(filename) {
  const filePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'public',
    'api',
    filename,
  );
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export default readJSONFile;
