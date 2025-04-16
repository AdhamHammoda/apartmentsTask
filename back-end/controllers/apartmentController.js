const Apartment = require('../models/apartmentModel');

async function listApartments(req, res) {
    const params = req.query;
    const apartments = await Apartment.getApartments(params?.unitNumber,params?.unitName,params.pageNumber,params.pageSize);
    res.json(apartments);
}

async function createApartment(req, res) {
    const apartment = req?.body;
    await Apartment.createApartment(apartment);
    res.status(202).json({ message: 'Apartment added' });
}

async function getApartmentDetails(req, res) {
    const apartmentId = req.params.id;
    const apartment = await Apartment.getApartmentDetails(apartmentId);
    res.json(apartment);
}

async function getApartmentsCount(req, res) {
    const count = await Apartment.getApartmentsCount();
    res.json(count);
}





module.exports = { listApartments, createApartment,getApartmentDetails,getApartmentsCount };