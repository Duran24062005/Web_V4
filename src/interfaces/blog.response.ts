export interface BlogResponse {
  status: string;
  results: number;
  data: BlogPost[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  imageUrl: string;
  published: boolean;
  views: number;
  createdAt: string | Date;   // Si quieres convertir a Date, usa: Date
  updatedAt: string | Date;   // Igual aquí
}
