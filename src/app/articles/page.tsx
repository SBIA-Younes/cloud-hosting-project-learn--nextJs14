import ArticleItem from "@/components/articles/articleitem";
import { Article } from "@/utils/types";

const ArticlesPage = async () => {
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
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          // Render an ArticleItem component for each article
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesPage;
