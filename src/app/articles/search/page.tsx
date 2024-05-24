interface SearchArticlePageProps {
  searchParams : { searchText: string}
}

function SearchArticlesPage({ searchParams }:SearchArticlePageProps) {
  console.log(searchParams);
  
  return (
    <section className='container m-auto px-5'>
      <h1 className="text-2xl font-bold">
        Search Text is: {searchParams.searchText}
      </h1>
    </section>
  )
}

export default SearchArticlesPage