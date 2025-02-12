import { PlayIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Link from "next/link";

type GenresType = {
  id: Number;
  name: String;
};

async function fetchGenres(): Promise<GenresType[]> {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  const data = await res.json();
  return data.genres;
}

export default async function Sidebar() {
  const genres = await fetchGenres();
  return (
    <div className="sticky top-0 h-screen overflow-auto">
      <div className="flex flex-col gap-4 p-2 bg-gray-100 rounded-lg shadow-md">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            variant="ghost"
            className="justify-start font-bold flex-grow hover:bg-gray-200 transition duration-200 ease-in-out rounded-md p-2"
            asChild
          >
            <Link
              href={`/genres/${genre.name}/${genre.id}`}
              className="flex items-center"
            >
              <PlayIcon className="mr-2" />
              {genre.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
