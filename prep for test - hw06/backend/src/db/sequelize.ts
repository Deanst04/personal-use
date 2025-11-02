import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Theater from "../models/theater";
import Movie from "../models/Movie";

const sequelize = new Sequelize({
    ...config.get('db'), 
    dialect: 'mysql',
    models: [Theater, Movie],
    logging: console.log
})

export default sequelize
