interface IPokemonParams {
    limit?: number;
    offset?: number;
}

export interface IPokemon {
    name: string,
    url: string,
}

export interface IPokemonData {
    count: number,
    next?: string,
    previous?: string,
    results: IPokemon[],
}

export interface IPokemonDetails {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    species: {
        name: string;
        url: string;
    };
    forms: {
        name: string;
        url: string;
    }[];
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
}

export function fetchAllPokemons(params?: IPokemonParams): Promise<IPokemonData> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${params?.limit ?? 20}&offset=${params?.offset?? 0}`;
    return fetch(url, {
        cache: 'force-cache',
    }).then((response) => response.json());
}

export function fetchPokemonDetailsByPokemonName(pokemonName: string): Promise<IPokemonDetails> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    return fetch(url, {
        cache: 'force-cache',
    }).then((response) => response.json());
}