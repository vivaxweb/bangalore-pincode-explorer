const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'pincodes.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // We drop the table if it exists to ensure the schema updates with lat/lng
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS pincodes`);
            
            db.run(`CREATE TABLE pincodes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pincode TEXT NOT NULL,
                area TEXT NOT NULL,
                lat REAL,
                lng REAL
            )`, (err) => {
                if (err) {
                    console.error('Error creating table', err.message);
                } else {
                    console.log('Table created or already exists.');
                    seedData();
                }
            });
        });
    }
});

const seedData = () => {
    const data = [
        { pincode: '560001', area: 'Mahatma Gandhi Road, Brigade Road, Vidhana Soudha', lat: 12.9716, lng: 77.5946 },
        { pincode: '560002', area: 'Kalasipalyam, City Market, S.P. Road', lat: 12.9650, lng: 77.5790 },
        { pincode: '560003', area: 'Malleswaram, Vyalikaval', lat: 13.0031, lng: 77.5643 },
        { pincode: '560004', area: 'Basavanagudi, V.V. Puram, Shankarapuram', lat: 12.9406, lng: 77.5738 },
        { pincode: '560005', area: 'Frazer Town, Cox Town, Richards Town', lat: 12.9968, lng: 77.6130 },
        { pincode: '560008', area: 'HAL 2nd Stage, Indiranagar', lat: 12.9706, lng: 77.6393 },
        { pincode: '560010', area: 'Rajajinagar, Mahalakshmi Layout', lat: 12.9840, lng: 77.5539 },
        { pincode: '560011', area: 'Jayanagar, South End Circle', lat: 12.9299, lng: 77.5826 },
        { pincode: '560020', area: 'Seshadripuram, Kumara Park West', lat: 12.9893, lng: 77.5746 },
        { pincode: '560021', area: 'Srirampuram, Okalipuram', lat: 12.9947, lng: 77.5583 },
        { pincode: '560025', area: 'Richmond Town, Langford Town', lat: 12.9649, lng: 77.6041 },
        { pincode: '560027', area: 'Wilson Garden, Shanthinagar', lat: 12.9463, lng: 77.5976 },
        { pincode: '560029', area: 'BTM Layout, SG Palya', lat: 12.9166, lng: 77.6101 },
        { pincode: '560034', area: 'Koramangala', lat: 12.9352, lng: 77.6245 },
        { pincode: '560037', area: 'Marathahalli, Kundalahalli', lat: 12.9569, lng: 77.7011 },
        { pincode: '560038', area: 'Indiranagar (100 Ft Road)', lat: 12.9784, lng: 77.6408 },
        { pincode: '560041', area: 'Jayanagar (East)', lat: 12.9260, lng: 77.5925 },
        { pincode: '560043', area: 'Banaswadi, Kalkere', lat: 13.0142, lng: 77.6519 },
        { pincode: '560047', area: 'Viveknagar, Austin Town', lat: 12.9556, lng: 77.6190 },
        { pincode: '560066', area: 'Whitefield', lat: 12.9698, lng: 77.7500 },
        { pincode: '560068', area: 'Madiwala, Bommanahalli', lat: 12.9226, lng: 77.6174 },
        { pincode: '560076', area: 'Bilekahalli', lat: 12.8988, lng: 77.6012 },
        { pincode: '560078', area: 'JP Nagar, Puttenahalli', lat: 12.9063, lng: 77.5857 },
        { pincode: '560095', area: 'Koramangala 6th Block', lat: 12.9388, lng: 77.6200 }
    ];

    db.get("SELECT COUNT(*) AS count FROM pincodes", (err, row) => {
        if (err) {
            console.error('Error counting records', err.message);
        } else if (row.count === 0) {
            console.log('Seeding initial data...');
            const insert = db.prepare("INSERT INTO pincodes (pincode, area, lat, lng) VALUES (?, ?, ?, ?)");
            data.forEach(item => {
                insert.run(item.pincode, item.area, item.lat, item.lng);
            });
            insert.finalize();
            console.log('Data seeding complete.');
        } else {
            console.log('Data already exists, skipping seeding.');
        }
    });
};

module.exports = db;
