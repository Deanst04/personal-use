import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Book from "../models/books";
import Genre from "../models/genres";

const sequelize = new Sequelize({
    ...config.get('db'), 
    dialect: 'mysql',
    models: [Book, Genre],
    logging: console.log
})

export default sequelize
