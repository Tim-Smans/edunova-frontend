import { Tag } from "./tag"

export interface Course{
    id: string
    title: string
    description: string
    category: string
    targetAudience: string
    published: boolean
    public: boolean
    isSequential: boolean
    imageUrl?: string
    tags?: Tag[]
    // Modules 
}