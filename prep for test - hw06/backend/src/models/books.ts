import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import Genre from "./genres";


@Table({
    underscored: true
})
export default class Books extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    name: string

    @AllowNull(false)
    @Column(DataType.STRING(100))
    description: string

    @ForeignKey(() => Genre)
    @AllowNull(false)
    @Column(DataType.UUID)
    genreId: string

    @AllowNull(false)
    @Column(DataType.FLOAT)
    price: number

    @AllowNull(false)
    @Column(DataType.INTEGER)
    stock: number

    @BelongsTo(() => Genre, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    genre: Genre
}