type MovieType = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  base_url: string;
  backdrop_path: string;
};

type CastType = {
  id: string;
  name: string;
  character: string;
  profile_path: string;
};

async function fetchMovie(id: string): Promise<MovieType> {
  const token = process.env.TMDB_TOKEN;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
}

async function fetchCasts(id: string): Promise<CastType[]> {
  const token = process.env.TMDB_TOKEN;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.cast;
}

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await fetchMovie(id);
  const casts = await fetchCasts(id);
  console.log(casts);
  const profile = "http://image.tmdb.org/t/p/w185";
  const cover = "http://image.tmdb.org/t/p/original";
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold px-2 my-2">{movie.title}</h1>
      </div>
      <div className="flex gap-2">
        <img
          src={cover + movie.backdrop_path}
          alt={movie.title}
          className="w-[50%]"
        />
        <div className="mt-2">{movie.overview}</div>
      </div>
      <h2 className="pb-1 mt-4 mb-3 border-b font-bold text-lg">Casts</h2>
      <div className="flex flex-wrap gap-2">
        {casts.map((cast) => {
          return (
            <div key={cast.id} className="w-[128px] text-center">
              <img src={profile + cast.profile_path} alt={cast.name} />
              <b>{cast.name}</b>
              <div className="text-gray-600 text-sm">{cast.character}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
