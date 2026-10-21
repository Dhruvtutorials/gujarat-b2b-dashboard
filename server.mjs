// Zero-Dependency Node.js Native HTTP API Server
// Run with: node server.mjs
import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'leads_database.json');

// Initialize database
let leadsDatabase = [];
try {
  if (fs.existsSync(DB_FILE)) {
    leadsDatabase = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  }
} catch (e) {
  console.warn('Could not read existing database file, initializing from fallback.');
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(leadsDatabase, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
}

// Enable standard CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Request helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // 1. Health check
  if (pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      version: '2.4.0',
      uptime: process.uptime(),
      dbSize: leadsDatabase.length,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. GET /api/leads
  if (pathname === '/api/leads' && req.method === 'GET') {
    const city = parsedUrl.searchParams.get('city');
    const state = parsedUrl.searchParams.get('state');
    const type = parsedUrl.searchParams.get('type');
    const q = parsedUrl.searchParams.get('q');

    let results = [...leadsDatabase];
    if (city && city !== 'all') {
      results = results.filter(l => l.city.toLowerCase() === city.toLowerCase());
    }
    if (state && state !== 'all') {
      results = results.filter(l => l.state.toLowerCase() === state.toLowerCase());
    }
    if (type && type !== 'all') {
      results = results.filter(l => l.type === type);
    }
    if (q && q.trim()) {
      const query = q.toLowerCase();
      results = results.filter(l =>
        l.name.toLowerCase().includes(query) ||
        l.city.toLowerCase().includes(query) ||
        l.dm.toLowerCase().includes(query) ||
        l.address.toLowerCase().includes(query)
      );
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
    return;
  }

  // 3. POST /api/leads
  if (pathname === '/api/leads' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const newLead = {
        id: data.id || `API-${Date.now().toString().slice(-4)}`,
        name: data.name || 'New Industrial Account',
        type: data.type || 'B2B',
        category: data.category || 'General Manufacturing',
        city: data.city || 'Surat',
        state: data.state || 'Gujarat',
        zone: data.zone || 'Industrial GIDC',
        address: data.address || '',
        rating: data.rating || 4.7,
        reviews: data.reviews || 100,
        website: data.website || 'No Website',
        dm: data.dm || 'Decision Maker',
        phone: data.phone || '9825000000',
        stage: data.stage || 'Audit Sent',
        priority: data.priority || 'Hot',
        webCost: data.webCost || 60000,
        mrr: data.mrr || 30000,
        dateAdded: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' AM',
        batchDate: new Date().toISOString().slice(0, 10),
        isNewToday: true,
        apiSynced: true
      };

      leadsDatabase.unshift(newLead);
      saveDb();

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newLead));
      return;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      return;
    }
  }

  // 4. POST /api/pitch
  if (pathname === '/api/pitch' && req.method === 'POST') {
    try {
      const payload = await parseBody(req);
      console.log(`[API PITCH LOGGED] To: ${payload.decisionMaker} (${payload.phone}) at ${new Date().toISOString()}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        status: 'delivered',
        message: 'Pitch webhook received and dispatched.',
        loggedAt: new Date().toISOString()
      }));
      return;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // 5. 404 Fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'API route not found', path: pathname }));
});

server.listen(PORT, () => {
  console.log(`\n🚀 Highway Corridor B2B REST API Server running at http://localhost:${PORT}/`);
  console.log(`📡 Endpoints:`);
  console.log(`   - GET  http://localhost:${PORT}/api/health`);
  console.log(`   - GET  http://localhost:${PORT}/api/leads`);
  console.log(`   - POST http://localhost:${PORT}/api/leads`);
  console.log(`   - POST http://localhost:${PORT}/api/pitch\n`);
});
