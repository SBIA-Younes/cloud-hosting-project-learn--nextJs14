import { Article } from "@/utils/types"

interface SingleArticlePagePropos {
  params: { id: string }
}

const SingleArticlePage = async ({params}:SingleArticlePagePropos) => {
  const response  = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  if (!response.ok) {
    throw new Error('Faild to fetch article')
  }

  const article:Article = await response.json()  

  return (
    <section className="container m-auto w-full px-5 pt-8 md:h-3/4">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
      </div>
      <div className="text-gray-400">1/1/2024</div>
      <p className="text-gray-800 text-xl mt-5">{article.body}</p>
    </section>
  )
}

export default SingleArticlePage