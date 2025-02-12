import MovieList from "@/components/movie-list";

type MovieType = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  base_url: string;
};

async function searchMovies(q: string): Promise<MovieType[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${q}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  return data.results;
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const movies = await searchMovies(q);
  return (
    <div className="flex flex-wrap">
      <h1 className="text-2xl font-bold px-2">Search: {q}</h1>
      <MovieList movies={movies} />
    </div>
  );
}
