const db = require('../config/db');


async function getApartmentDetails(id) {
    const [rows] = await db.query('SELECT * FROM APARTMENT WHERE ID = ?', id);
    return mapApartmentFromQuery(rows[0]);
  }


async function getApartments(unitNumber,unitName,pageNumber,pageSize) {
    var query = 'SELECT * FROM APARTMENT WHERE 1 = 1 ';
    const params = [];
    if(unitNumber!='')
      {
        query = query.concat(" AND NUMBER = ?");
        params.push(unitNumber*1)
    }
    if(unitName!='')
      {
        query = query.concat(" AND LOWER(NAME) LIKE ? ");
        unitName = "%" + unitName + "%";
        params.push([unitName])
      }
      params.push(pageNumber*pageSize);
      params.push(pageSize*1);
      query = query.concat(' LIMIT ? , ? ;');
      const [rows] = await db.query(query,params);
      const result = rows.map(row=>mapApartmentFromQuery(row));
      return result;
    }
    
  async function createApartment(apartment) {
    const [result] = await db.query(
      `INSERT INTO APARTMENT
       (project_id,name,description,number,location,price,bedrooms,bathrooms,area)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
       [
        apartment.projectId,
        apartment.name,apartment.description,
        apartment.number*1,apartment.location,
        apartment.price*1.0,apartment.bedrooms,
        apartment.bathrooms,apartment.area*1.0,
      ]);
      
      return { id: result.insertId, ...apartment };
    }

  async function getApartmentsCount() {
    var query = 'SELECT COUNT(*) as count FROM APARTMENT';
    const [rows] = await db.query(query);
      return rows[0];
  }
    
  function mapApartmentFromQuery(dbRow)
  {
    return {
      id:dbRow.ID,
      projectId:dbRow.PROJECT_ID,
      name:dbRow.NAME,
      description:dbRow.DESCRIPTION,
      number:dbRow.NUMBER,
      location:dbRow.LOCATION,
      price:dbRow.PRICE,
      bedrooms:dbRow.BEDROOMS,
      area:dbRow.AREA,
    }
  }

  module.exports = { getApartments, createApartment, getApartmentDetails,getApartmentsCount};

