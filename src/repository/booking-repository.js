const {StatusCodes} = require('http-status-code');
const {Booking} = require('../models/index');
const {AppError, ValidationError} = require('../utils/errors/index');

class BookingRepository {
    async Create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'cannot create Booking',
                'There was some issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(bookingId, data) {
        try{
            const booking = await Booking.findByPk(bookingId);
            if(data.status){
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        }
        catch (error){
            throw new AppError(
                'RepositoryError',
                'cannot update Booking',
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;