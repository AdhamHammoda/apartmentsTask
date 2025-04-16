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

async function insertSampleProjectsData() {
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

async function insertSampleApartmentsData() {
  try {
    const apartments = [
      {
        projectId: 1,
        name: 'Apartment 1',
        description: 'Spacious two-bedroom apartment with balcony.',
        number: 101,
        location: 'Cairo',
        price: 1223.00,
        bedrooms: 2,
        bathrooms: 2,
        area: 233.0
      },
      {
        projectId: 2,
        name: 'Apartment 2',
        description: 'Cozy one-bedroom apartment ideal for singles.',
        number: 202,
        location: 'Alexandria',
        price: 899.99,
        bedrooms: 1,
        bathrooms: 1,
        area: 150.0
      }
    ];

    const [rows] = await db.query("SELECT COUNT(*) AS count FROM APARTMENT");
    if (rows[0].count === 0) {
      for (const apt of apartments) {
        await db.query(
          `INSERT INTO APARTMENT 
          (PROJECT_ID, NAME, DESCRIPTION, NUMBER, LOCATION, PRICE, BEDROOMS, BATHROOMS, AREA)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            apt.projectId,
            apt.name,
            apt.description,
            apt.number,
            apt.location,
            apt.price,
            apt.bedrooms,
            apt.bathrooms,
            apt.area
          ]
        );
      }
      console.log('Sample apartments inserted successfully');
    }
  } catch (error) {
    console.error('Error inserting sample apartments:', error);
  }
}

module.exports = {createTables, insertSampleProjectsData,insertSampleApartmentsData };