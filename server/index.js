const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API endpoint to search pincodes or areas
app.get('/api/pincodes/search', (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    const sql = `
        SELECT * FROM pincodes 
        WHERE pincode LIKE ? OR LOWER(area) LIKE ?
        ORDER BY pincode ASC
    `;
    const searchParam = `%${query.toLowerCase()}%`;

    db.all(sql, [searchParam, searchParam], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ data: rows });
    });
});

// API endpoint to get all pincodes (limited for performance)
app.get('/api/pincodes', (req, res) => {
    const sql = `SELECT * FROM pincodes ORDER BY pincode ASC LIMIT 50`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ data: rows });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
