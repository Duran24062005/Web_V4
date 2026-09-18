export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorId?: string | null;
  authorName?: string;
  authorEmail?: string | null;
  tags: string[];
  imageUrl: string;
  published: boolean;
  views: number;
  createdAt: string | Date;   // Si quieres convertir a Date, usa: Date
  updatedAt: string | Date;   // Igual aquí
}
