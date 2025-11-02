import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Theater from "./theater";

@Table({
    underscored: true
})
export default class Movie extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @ForeignKey(() => Theater)
    @AllowNull(false)
    @Column(DataType.UUID)
    theaterId: string

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @AllowNull(false)
    @Column(DataType.DATE)
    showTime: Date

    @AllowNull(false)
    @Column(DataType.INTEGER)
    duration: number

    @BelongsTo(() => Theater, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    theater: Theater
}