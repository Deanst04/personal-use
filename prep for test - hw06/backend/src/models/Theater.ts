import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Movie from "./Movie";

@Table({
    underscored: true
})
export default class Theater extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @HasMany(() => Movie, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    movies: Movie[]
}