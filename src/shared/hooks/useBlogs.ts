import { useEffect, useState } from 'react';
import type { Blog } from '../../interfaces/blog.interface';
import { getBlogs } from '../../services/blogs/blogs.service';
import { getErrorMessage } from '../../lib/http';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getBlogs('all');
        setBlogs(data);
        setAllBlogs(data);
      } catch (loadError) {
        setError(getErrorMessage(loadError, 'No fue posible cargar los blogs.'));
      } finally {
        setLoading(false);
      }
    };

    void loadBlogs();
  }, []);

  const searchBlogs = (query: string) => {
    if (!query || query === 'all') {
      setBlogs(allBlogs);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const filteredResults = allBlogs.filter((blog) => {
      const titleMatch = blog.title.toLowerCase().includes(normalizedQuery);
      const authorMatch = blog.author.toLowerCase().includes(normalizedQuery);
      const tagMatch = blog.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return titleMatch || authorMatch || tagMatch;
    });

    setBlogs(filteredResults);
  };

  return {
    blogs,
    loading,
    error,
    searchBlogs,
  };
};
