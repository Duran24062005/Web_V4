import { api } from "../api/base.api";
import type { Blog } from "../interfaces/blog.interface";
import type { BlogResponse } from "../interfaces/blog.response";

export default async function getBlogs(path: string): Promise<Blog[]> {
  try {
    const response = await api.get<BlogResponse>(`api/blogs/${path}`);
    console.log(response);

    /*
        Parsear los datos a un array de tipo Blog
    */
    return await response.data.data.map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      tags: blog.tags,
      imageUrl: blog.imageUrl,
      published: blog.published,
      views: blog.views,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));
  } catch (error) {
    console.log(`Error fetching blogs: ${error}`);
    return [];
  }
}
