console.log("🧪 Start of file");

const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('✅ GET /test is working');
});

app.post('/test', (req, res) => {
  console.log('🔥 POST /test called with body:', req.body);
  res.send('✅ POST /test is working');
});

app.listen(5000, () => {
  console.log('🚀 Test server running on http://localhost:5000');
});
