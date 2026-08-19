const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'pincodes.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        db.run(`CREATE TABLE IF NOT EXISTS pincodes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pincode TEXT NOT NULL,
            area TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Table created or already exists.');
                seedData();
            }
        });
    }
});

const seedData = () => {
    const data = [
        { pincode: '560001', area: 'Mahatma Gandhi Road, Brigade Road, Vidhana Soudha' },
        { pincode: '560002', area: 'Kalasipalyam, City Market, S.P. Road' },
        { pincode: '560003', area: 'Malleswaram, Vyalikaval' },
        { pincode: '560004', area: 'Basavanagudi, V.V. Puram, Shankarapuram' },
        { pincode: '560005', area: 'Frazer Town, Cox Town, Richards Town' },
        { pincode: '560008', area: 'HAL 2nd Stage, Indiranagar' },
        { pincode: '560010', area: 'Rajajinagar, Mahalakshmi Layout' },
        { pincode: '560011', area: 'Jayanagar, South End Circle' },
        { pincode: '560020', area: 'Seshadripuram, Kumara Park West' },
        { pincode: '560021', area: 'Srirampuram, Okalipuram' },
        { pincode: '560025', area: 'Richmond Town, Langford Town' },
        { pincode: '560027', area: 'Wilson Garden, Shanthinagar' },
        { pincode: '560029', area: 'BTM Layout, SG Palya' },
        { pincode: '560034', area: 'Koramangala' },
        { pincode: '560037', area: 'Marathahalli, Kundalahalli' },
        { pincode: '560038', area: 'Indiranagar (100 Ft Road)' },
        { pincode: '560041', area: 'Jayanagar (East)' },
        { pincode: '560043', area: 'Banaswadi, Kalkere' },
        { pincode: '560047', area: 'Viveknagar, Austin Town' },
        { pincode: '560066', area: 'Whitefield' },
        { pincode: '560068', area: 'Madiwala, Bommanahalli, Garvebhavipalya' },
        { pincode: '560076', area: 'BTM Layout 2nd Stage, Bilekahalli' },
        { pincode: '560078', area: 'JP Nagar, Puttenahalli' },
        { pincode: '560095', area: 'Koramangala 6th Block' }
    ];

    db.get("SELECT COUNT(*) AS count FROM pincodes", (err, row) => {
        if (err) {
            console.error('Error counting records', err.message);
        } else if (row.count === 0) {
            console.log('Seeding initial data...');
            const insert = db.prepare("INSERT INTO pincodes (pincode, area) VALUES (?, ?)");
            data.forEach(item => {
                insert.run(item.pincode, item.area);
            });
            insert.finalize();
            console.log('Data seeding complete.');
        } else {
            console.log('Data already exists, skipping seeding.');
        }
    });
};

module.exports = db;
