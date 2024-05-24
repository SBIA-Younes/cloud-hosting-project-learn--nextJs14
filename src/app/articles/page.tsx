import ArticleItem from "@/components/articles/articleitem";
import { Article } from "@/utils/types";
import { Metadata } from "next";
import SearchArticleInput from "./SearchArticleInput";
import Pagination from "./Pagination";

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programing",
};


const ArticlesPage = async () => {

  // delay 3s
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Fetch articles from the API
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    // { cache: "no-store" } // Do not use cache
    // { cache: "force-cache" } // Use default cache
    { next: { revalidate: 50 } } // Reload data every 50 seconds
);

  // Check if the response is successful
  if (!response.ok) {
    throw new Error("Faild to fetch aerticles");
  }

  // Parse the response as an array of articles
  const articles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0,6).map((item) => (
          // Render an ArticleItem component for each article
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ArticlesPage;
