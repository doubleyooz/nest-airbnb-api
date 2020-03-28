const express = require('express');
const multer = require('multer');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);


routes.get('/', (req, res) => {
    return res.json({ message: "Hello World"});

});

routes.get('/spots', SpotController.index);
routes.delete('/spots/delete', SpotController.delete);

routes.post('/sessions', SessionController.store);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);


module.exports = routes;