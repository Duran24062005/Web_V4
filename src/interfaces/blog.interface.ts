export interface Blog {
    id:        string;
    title:     string;
    content:   string;
    excerpt:   string;
    author:    string;
    tags:      string[];
    imageUrl:  string;
    published: boolean;
    views:     number;
    createdAt: string | Date;
    updatedAt: string | Date;
}