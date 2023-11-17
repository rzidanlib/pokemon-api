import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Pokemon } from "../interfaces/Pokemon";
import { fetchPokemon } from "../api/api";
import Navbar from "../components/Navbar";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setfilteredPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 32;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemon(limit, offset);
        setPokemonList(data);
        setLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData();
  }, [offset]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const filterPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );

      setfilteredPokemonList(filterPokemon);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, pokemonList]);

  const handleNextPage = () => {
    setOffset(offset + limit);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearchPokemon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <section>
      <Navbar searchValue={search} searchChange={handleSearchPokemon} />
      {loading && <div className="text-center">Loading ...</div>}
      <div className="grid grid-cols-4 gap-4 p-5">
        {filteredPokemonList.length !== 0 ? (
          filteredPokemonList.map((pokemon, index) => (
            <Card
              key={index}
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.image}
            />
          ))
        ) : (
          <>
            {!loading && (
              <div className="place-items-center">Pokemon Tidak Ada.</div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-center mb-5">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handlePrevPage}
            disabled={offset === 0}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 "
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
