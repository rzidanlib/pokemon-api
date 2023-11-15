import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Pokemon } from "../interfaces/Pokemon";
import { fetchPokemon, filterPokemon, searchPokemon } from "../api/api";
import Navbar from "../components/Navbar";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonSearch, setPokemonSearch] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const limit = 32;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemon(limit, offset);
        setPokemonList(data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData();
  }, [offset]);

  useEffect(() => {
    const performSearch = async () => {
      if (search.trim() !== "") {
        const filter = await filterPokemon(search);
        const results = await searchPokemon(search);
        setPokemonSearch(filter.length === 0 ? results : filter);
      } else {
        setPokemonSearch([]);
      }
    };

    performSearch();
  }, [search]);

  const handleNextPage = () => {
    setOffset(offset + limit);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling
    });
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling
    });
  };

  const handleSearchPokemon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const displayPokemon = search.trim() !== "" ? pokemonSearch : pokemonList;

  console.log(pokemonSearch);

  return (
    <section>
      <Navbar searchValue={search} searchChange={handleSearchPokemon} />
      <div className="grid grid-cols-4 gap-4 p-5">
        {displayPokemon.map((pokemon, index) => (
          <Card
            key={index}
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.image}
          />
        ))}
      </div>
      <div className="flex flex-col items-center mb-5">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handlePrevPage}
            disabled={offset === 0}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 "
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
