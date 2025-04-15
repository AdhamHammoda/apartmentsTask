const db = require('../config/db'); 

async function createTables() {
   try{

    db.query(`
        CREATE TABLE IF NOT EXISTS PROJECT (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        NAME VARCHAR(255) NOT NULL,
        LOCATION VARCHAR(255),
        DESCRIPTION VARCHAR(255),
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     `)

    db.query(`
        CREATE TABLE IF NOT EXISTS APARTMENT (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        PROJECT_ID INT, 
        NAME VARCHAR(255) NOT NULL,
        DESCRIPTION VARCHAR(255),
        NUMBER INT,
        LOCATION VARCHAR(255),
        PRICE DECIMAL(10, 2),
        BEDROOMS INT,
        BATHROOMS INT,
        AREA FLOAT,
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (PROJECT_ID) REFERENCES PROJECT(id) ON DELETE SET NULL
        );
      `);
    }
    catch (error) {
        console.error('Error creeating tables:', error);
      }
}

async function insertSampleData() {
  try {
    const projects = [
      {
        name: 'Green Valley Residence',
        location: 'Uptown',
        description: 'A modern eco-friendly housing project offering a mix of 1BR, 2BR, and 3BR apartments.',
      },
      {
        name: 'Skyline Towers',
        location: 'Downtown',
        description: 'Luxury high-rise apartments with amazing city views.',
      },
      {
        name: 'Ocean Breeze Apartments',
        location: 'Coastal Area',
        description: 'Seaside apartments perfect for those who love the beach and fresh air.',
      },
      {
        name: 'Parkview Residences',
        location: 'Central Park',
        description: 'Spacious apartments overlooking the park with green spaces and outdoor living.',
      },
    ];
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM PROJECT");
    if(rows[0].count==0)
    {
      for (const project of projects) {
        await db.query(
          "INSERT INTO PROJECT (NAME, LOCATION, DESCRIPTION) VALUES (?, ?, ?)",
          [project.name, project.location, project.description]
        );
      }
      console.log('Sample projects inserted successfully');
    }

  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

module.exports = { createTables, insertSampleData };