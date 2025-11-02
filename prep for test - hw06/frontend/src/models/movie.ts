import type MovieDraft from "./movieDraft";

export default interface Movie extends MovieDraft {
    id: string,
    createdAt: Date,
    updatedAt: Date
}