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
  query ($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

const SingleArticleView = ({
  name,
  id,
}: {
  name: string | string[];
  id: string | string[];
}) => {
  const [pageProps, setPageProps] = useState<pageProps>({ page: 0, limit: 9 });
  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { id },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [article, setArticle] = useState<articleType>({
    id: "",
    title: "",
    body: "",
  });

  const totalPageCount = Math.ceil(
    data?.posts?.meta?.totalCount / pageProps.limit
  );

  console.log("datadata", data);

  useEffect(() => {
    if (data?.post) {
      setArticle(data.post);
    }
  }, [data]);

  //   const handleSearch = (term: string) => {
  //     setSearchTerm(term.toLowerCase());
  //   };

  //   useEffect(() => {
  //     // Filter articles based on search term
  //     if (data) {
  //       const filtered = data.posts.data.filter((article: articleType) =>
  //         article.title.toLowerCase().includes(searchTerm)
  //       );
  //       setFilteredArticles(filtered);
  //     }
  //   }, [searchTerm, data]);

  //   const handleSortBy = (sortBy: sortField, sortOrder?: sortOrder) => {
  //     if (sortBy === "default") {
  //       // Reset to default order
  //       setFilteredArticles([...data.posts.data]);
  //     } else {
  //       const sorted = [...filteredArticles].sort((a, b) => {
  //         let comparison = 0;

  //         if (sortBy === "title") {
  //           comparison = a.title.localeCompare(b.title);
  //         } else if (sortBy === "id") {
  //           comparison = a.id.localeCompare(b.id);
  //         }

  //         return sortOrder === "asc" ? comparison : -comparison;
  //       });
  //       setFilteredArticles(sorted);
  //     }
  //   };

  //   const handlePagination = (page: number) => {
  //     setPageProps({
  //       ...pageProps,
  //       page: page + 1,
  //     });
  //   };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  console.log("pagepage", pageProps, totalPageCount);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Article No: {id}
      </h1>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer">
        <h2 className="text-xl font-semibold mb-2 text-white capitalize">
          {article.title}
        </h2>
        <p className="text-gray-300">{article.body}</p>
      </div>

      <Link className="block mt-6 ml-6 text-[#69beff] underline text-center" href="/">
        Go to Home
      </Link>
    </div>
  );
};

export default SingleArticleView;
