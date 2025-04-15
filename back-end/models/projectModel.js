const db = require('../config/db');


async function getProjects() {
    var query = 'SELECT * FROM PROJECT';
    const [rows] = await db.query(query);
    const result = rows.map(row=>mapProjectFromQuery(row));
    return result;
}
    
  
  function mapProjectFromQuery(dbRow)
  {
    return {
      id:dbRow.ID,
      name:dbRow.NAME,
    }
  }

  module.exports = { getProjects};

