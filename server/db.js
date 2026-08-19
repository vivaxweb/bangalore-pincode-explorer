const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'pincodes.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS pincodes`);
            
            db.run(`CREATE TABLE pincodes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pincode TEXT NOT NULL,
                area TEXT NOT NULL,
                post_office TEXT NOT NULL,
                office_type TEXT NOT NULL,
                district TEXT NOT NULL DEFAULT 'Bangalore',
                state TEXT NOT NULL DEFAULT 'Karnataka',
                delivery_status TEXT NOT NULL DEFAULT 'Delivery',
                lat REAL,
                lng REAL
            )`, (err) => {
                if (err) {
                    console.error('Error creating table', err.message);
                } else {
                    console.log('Table created. Seeding data...');
                    seedData();
                }
            });
        });
    }
});

const seedData = () => {
    const data = [
        { pincode: '560001', area: 'Mahatma Gandhi Road, Brigade Road, Vidhana Soudha', post_office: 'Bangalore GPO', office_type: 'Head Office', delivery_status: 'Delivery', lat: 12.9716, lng: 77.5946 },
        { pincode: '560002', area: 'Kalasipalyam, City Market, S.P. Road', post_office: 'Kalasipalyam S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9650, lng: 77.5790 },
        { pincode: '560003', area: 'Malleswaram, Vyalikaval', post_office: 'Malleswaram S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 13.0031, lng: 77.5643 },
        { pincode: '560004', area: 'Basavanagudi, V.V. Puram, Shankarapuram', post_office: 'Basavanagudi S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9406, lng: 77.5738 },
        { pincode: '560005', area: 'Frazer Town, Cox Town, Richards Town', post_office: 'Frazer Town S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9968, lng: 77.6130 },
        { pincode: '560008', area: 'HAL 2nd Stage, Indiranagar', post_office: 'Indiranagar S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9706, lng: 77.6393 },
        { pincode: '560010', area: 'Rajajinagar, Mahalakshmi Layout', post_office: 'Rajajinagar S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9840, lng: 77.5539 },
        { pincode: '560011', area: 'Jayanagar, South End Circle', post_office: 'Jayanagar S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9299, lng: 77.5826 },
        { pincode: '560020', area: 'Seshadripuram, Kumara Park West', post_office: 'Seshadripuram S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9893, lng: 77.5746 },
        { pincode: '560021', area: 'Srirampuram, Okalipuram', post_office: 'Srirampuram S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9947, lng: 77.5583 },
        { pincode: '560025', area: 'Richmond Town, Langford Town', post_office: 'Richmond Town S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9649, lng: 77.6041 },
        { pincode: '560027', area: 'Wilson Garden, Shanthinagar', post_office: 'Shanthinagar S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9463, lng: 77.5976 },
        { pincode: '560029', area: 'BTM Layout, SG Palya', post_office: 'BTM Layout S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9166, lng: 77.6101 },
        { pincode: '560034', area: 'Koramangala', post_office: 'Koramangala S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9352, lng: 77.6245 },
        { pincode: '560037', area: 'Marathahalli, Kundalahalli', post_office: 'Marathahalli S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9569, lng: 77.7011 },
        { pincode: '560038', area: 'Indiranagar (100 Ft Road)', post_office: 'HAL S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9784, lng: 77.6408 },
        { pincode: '560041', area: 'Jayanagar (East)', post_office: 'Jayanagar East S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9260, lng: 77.5925 },
        { pincode: '560043', area: 'Banaswadi, Kalkere', post_office: 'Banaswadi S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 13.0142, lng: 77.6519 },
        { pincode: '560047', area: 'Viveknagar, Austin Town', post_office: 'Viveknagar S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9556, lng: 77.6190 },
        { pincode: '560066', area: 'Whitefield', post_office: 'Whitefield S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9698, lng: 77.7500 },
        { pincode: '560068', area: 'Madiwala, Bommanahalli', post_office: 'Madiwala S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9226, lng: 77.6174 },
        { pincode: '560076', area: 'Bilekahalli', post_office: 'Bilekahalli B.O', office_type: 'Branch Office', delivery_status: 'Delivery', lat: 12.8988, lng: 77.6012 },
        { pincode: '560078', area: 'JP Nagar, Puttenahalli', post_office: 'J P Nagar S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9063, lng: 77.5857 },
        { pincode: '560095', area: 'Koramangala 6th Block', post_office: 'Koramangala 6th Block S.O', office_type: 'Sub Office', delivery_status: 'Delivery', lat: 12.9388, lng: 77.6200 }
    ];

    console.log('Seeding initial data...');
    const insert = db.prepare("INSERT INTO pincodes (pincode, area, post_office, office_type, district, state, delivery_status, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    data.forEach(item => {
        insert.run(item.pincode, item.area, item.post_office, item.office_type, 'Bangalore Urban', 'Karnataka', item.delivery_status, item.lat, item.lng);
    });
    insert.finalize();
    console.log('Data seeding complete.');
};

module.exports = db;
