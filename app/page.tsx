import MovieList from "@/components/movie-list";

type MovieType = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  base_url: string;
};

async function fetchPopular(): Promise<MovieType[]> {
  const token = process.env.TMDB_TOKEN;
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.results;
}

async function fetchUpcoming(): Promise<MovieType[]> {
  const token = process.env.TMDB_TOKEN;
  const res = await fetch("https://api.themoviedb.org/3/movie/upcoming", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const popular = await fetchPopular();
  const upcoming = await fetchUpcoming();
  return (
    <div>
      <h1 className="text-3xl font-bold px-2 my-2">Popular</h1>
      <MovieList movies={popular} />
      <hr className="my-4" />
      <h1 className="text-3xl font-bold px-2 my-2">Upcoming</h1>
      <MovieList movies={upcoming} />
    </div>
  );
}
