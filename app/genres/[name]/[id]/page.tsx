import MovieList from "@/components/movie-list";

async function fetchByGenres(id: string) {
  const token = process.env.TMDB_TOKEN;
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data.results;
}

export default async function Genre({
  params,
}: {
  params: Promise<{ name: string; id: string }>;
}) {
  const { id, name } = await params;
  const movies = await fetchByGenres(id);
  return (
    <div>
      <div className="flex flex-wrap">
        <h1 className="text-2xl font-bold px-2">{name}</h1>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}
