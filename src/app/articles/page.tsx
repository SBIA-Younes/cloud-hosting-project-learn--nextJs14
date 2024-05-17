import ArticleItem from "@/components/articles/articleitem";
import { Article } from "@/utils/types";

const ArticlesPage = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Faild to fetch aerticles")
  }
  const articles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesPage;
