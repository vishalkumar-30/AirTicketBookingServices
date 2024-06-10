const express = require('express');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.config();
// require('dotenv').config();

const app = express();

const { PORT } = require('./config/serverConfig') || 3002;
const apiRoutes = require('./routes/index');


const setupAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter:true});
        }
    });

}

setupAndStartServer();