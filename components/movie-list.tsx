import Link from "next/link";
import Image from "next/image";

type MovieType = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  base_url: string;
};

export default async function MovieList({ movies }: { movies: MovieType[] }) {
  const base_url = "http://image.tmdb.org/t/p/w185";
  return (
    <div>
      <div className="flex flex-wrap">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              id={movie.id}
              className="p-2 w-[185px] transition-all hover:scale-105 duration-300 cursor-pointer flex flex-col h-full"
            >
              <Link href={`/movie/${movie.id}`}>
                <div className="flex flex-col h-full justify-between">
                  {" "}
                  <Image
                    src={base_url + movie.poster_path}
                    alt=""
                    className="mb-2"
                  />{" "}
                  <div className="flex flex-col">
                    {" "}
                    <h1 className="text-center font-bold">{movie.title}</h1>
                    <h2 className="text-center">
                      {movie.release_date.split("-")[0]}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
