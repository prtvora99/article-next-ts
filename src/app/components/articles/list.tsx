"use client";

import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import Loader from "../loader/loader";
import SearchFilter from "../search/search";
import {
  articleType,
  pageProps,
  sortField,
  sortOrder,
} from "@/src/types/article";
import Pagination from "../pagination/pagination";
import Link from "next/link";
import { slugify } from "@/src/utils/slug";

const GET_ARTICLES = gql`
  query ($page: Int!, $limit: Int!) {
    posts(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;

const ArticleList = () => {
  const [pageProps, setPageProps] = useState<pageProps>({ page: 0, limit: 9 });
  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { page: pageProps.page, limit: pageProps.limit },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<articleType[]>([]);

  const totalPageCount = Math.ceil(
    data?.posts?.meta?.totalCount / pageProps.limit
  );

  console.log("datadata", data);

  useEffect(() => {
    if (!loading && data) {
      setFilteredArticles([...data.posts.data]);
    }
  }, [loading, data]);

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  useEffect(() => {
    // Filter articles based on search term
    if (data) {
      const filtered = data.posts.data.filter((article: articleType) =>
        article.title.toLowerCase().includes(searchTerm)
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm, data]);

  const handleSortBy = (sortBy: sortField, sortOrder?: sortOrder) => {
    if (sortBy === "default") {
      // Reset to default order
      setFilteredArticles([...data.posts.data]);
    } else {
      const sorted = [...filteredArticles].sort((a, b) => {
        let comparison = 0;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "id") {
          comparison = a.id.localeCompare(b.id);
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });
      setFilteredArticles(sorted);
    }
  };

  const handlePagination = (page: number) => {
    setPageProps({
      ...pageProps,
      page: page + 1,
    });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  console.log("pagepage", pageProps, totalPageCount);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Articles
      </h1>
      <SearchFilter onSearch={handleSearch} onSortBy={handleSortBy} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article: articleType) => (
          <Link
            href={`/article/${slugify(article.title)}/${article.id}`}
            key={article.id}
            className="bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white capitalize">
                {article.title}
              </h2>
              <p className="text-gray-300">{article.body}</p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        pageCount={totalPageCount}
        currentPage={pageProps.page}
        onPageChange={handlePagination}
      />
    </div>
  );
};

export default ArticleList;
