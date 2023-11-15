/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Pokemon, PokemonDetail } from "../interfaces/Pokemon";

export const fetchPokemon = async (
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonList = response.data.results;

    const pokemonDetails = pokemonList.map(async (pokemon: any) => {
      const pokemonData = await axios.get(pokemon.url);
      return {
        id: pokemonData.data.id,
        name: pokemonData.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.data.id}.png`,
      };
    });

    return Promise.all(pokemonDetails);
  } catch (error) {
    console.log("Error fetching data....", error);
    return [];
  }
};

export const filterPokemon = async (name: string): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
    const pokemonList = response.data.results;

    const filteredPokemon = pokemonList.filter((pokemon: any) =>
      pokemon.name.includes(name.toLowerCase())
    );

    const pokemonDetails = filteredPokemon.map(async (pokemon: any) => {
      const pokemonData = await axios.get(pokemon.url);
      return {
        id: pokemonData.data.id,
        name: pokemonData.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.data.id}.png`,
      };
    });

    return Promise.all(pokemonDetails);
  } catch (error) {
    console.log("Error fetching data....", error);
    return [];
  }
};

// Search pokemon while word is complete
export const searchPokemon = async (name: string): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    const pokemonData = response.data;
    return [
      {
        id: pokemonData.id,
        name: pokemonData.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
      },
    ];
  } catch (error) {
    console.error("Error searching Pokemon:", error);
    return [];
  }
};

export const fetchPokemonDetail = async (
  id: number
): Promise<PokemonDetail | null> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching data....", error);
    return null;
  }
};
