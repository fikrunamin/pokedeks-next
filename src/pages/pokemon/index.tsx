import MainLayout from "@/components/layouts/MainLayout";
import styled from "styled-components";
import PokemonCard from "@/pages/pokemon/_components/PokemonCard";
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';
import {fetchAllPokemons, IPokemon, IPokemonData} from "@/lib/api/pokemon/PokemonApi";
import { useEffect, useState } from "react";

const Container = styled.div`
    max-width: 991px;
    margin: 0 auto;
    padding: 1rem;
    display: grid;
    gap: 1rem;
`;

const Title = styled.h1`
    font-size: 2.25rem;
    line-height: 2.5rem;
    text-align: center;
    font-weight: 700;
    @media (prefers-color-scheme: dark) {
        color: white;
    }
`;

const PokemonList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 2rem;
`;

function Page({ pokemons }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [data, setData] = useState<IPokemon[]>(pokemons.results);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let limit = 20;
        function handleScroll(event: any) {
            const tolerance = 500;
            const {scrollTop, scrollHeight, clientHeight}  = event.target;

            if(scrollTop >= scrollHeight - clientHeight - tolerance) {
                if(isFetching) return;

                setIsFetching(true);
                limit += 20;

                fetchAllPokemons({limit}).then((result) => {
                    setData(result.results);
                    setIsFetching(false);
                });
            }
        }
        
        document.querySelector('body')?.addEventListener('scroll', handleScroll);

        return () => {
            document.querySelector('body')?.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <MainLayout>
            <Container>
                <Title>🔥 Pokedeks 🔥</Title>
                <PokemonList>
                    {data.map((pokemon) => (
                        <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    ))}
                </PokemonList>
            </Container>
        </MainLayout>
    );
}

export const getServerSideProps = (async () => {
    const pokemons = await fetchAllPokemons();
    return {props: {pokemons}}
}) satisfies GetServerSideProps<{ pokemons: IPokemonData }>

export default Page;