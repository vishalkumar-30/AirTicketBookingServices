const {StatusCodes} = require('http-status-code');
const {BookingService } = require('../services/index');

const bookingService = new BookingService();

const create = async (req, res) => {
    
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
        messasge: 'Succesfully completed booking',
        success: true,
        err: {},
        data: response
    })
    } catch (error) {
        return res.status(error.statusCodes).json({
            messasge: error.message,
            success: false,
            err: error.explanation,
            data: {}
        })
    }
}

module.exports = {
    create
}