import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Book from "./books";

@Table({
    underscored: true
})
export default class Genres extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    name: string

    @HasMany(() => Book, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    books: Book[]
}