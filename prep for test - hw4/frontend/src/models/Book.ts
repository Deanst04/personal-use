import type { BookDraft } from "./Book-draft";

export interface Book extends BookDraft{
    id: string,
    createdAt: string
    updatedAt: string
}