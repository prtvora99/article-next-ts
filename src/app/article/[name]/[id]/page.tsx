"use client";

import { useParams } from "next/navigation";
import SingleArticleView from "../../../components/articles/single-article";

const SingleArticle = () => {
  const params = useParams();
  console.log("paramsparams", params);
  return (
    <div>
      <SingleArticleView id={params.id} name={params.name} />
    </div>
  );
};

export default SingleArticle;
