import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { fetchPokemonDetailsByPokemonName, IPokemon, IPokemonDetails } from "@/lib/api/pokemon/PokemonApi";
import Link from "next/link";
import Image from "next/image";
import { prominent } from "color.js";

interface IPokemonCardProps {
    pokemon: IPokemon;
}

const Card = styled.div`
    position: relative;
    height: fit-content;
    display: flex;
    align-items: end;
    border-width: 1px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border-radius: 0.75rem;
    overflow: hidden;
    background-color: rgb(23 23 23);
    color: white;
    
    @media (prefers-color-scheme: dark) {
        --tw-shadow-color: #404040;
        border-color: rgb(64 64 64);
        background: white;
        color: black;
    }

    & > .circle {
        width: 150%;
        height: 150%;
        position: absolute;
        bottom: 70%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 0;
        border-radius: 50%;
    }
`;

const Pokemon = styled.div`
    padding: 5rem 1rem 1rem;
    position: relative;
    height: 75%;
    width: 100%;
    display: block;

    & > .img-box {
        border-radius: 50%;
        width: 125px;
        height: 125px;
        margin: 0 auto;
    }

    & h2 {
        font-weight: 500;
        text-align: center;
        font-size: 1.25rem;
    }
`;

const Abilities = styled.div`
    margin-top: 1rem;

    & > h4 {
        font-weight: 500;
        font-size: .875rem;
    }

    & .abilities {
        display: flex;
        gap: .75rem;
        flex-wrap: wrap;
        margin-top: .25rem;
    }

    & .ability {
        border-radius: 9999px;
        padding: .375rem .625rem;
        font-size: .75rem;
    }
`;

const Stats = styled.div`
    margin-top: 1rem;

    & > h4 {
        font-weight: 500;
        font-size: .875rem;
    }

    & .stats {
        display: grid;
        gap: 0.125rem;
        margin-top: .25rem;
    }

    & .stat {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .5rem;
        font-size: .75rem;

        & > div {
            flex: none;
        }

        & > div:nth-of-type(2) {
            flex-grow: 1;
            height: 1px;
            background: black;
        }
    }
    
`;

function PokemonCard({pokemon}: IPokemonCardProps) {
    const [detail, setDetail] = useState<IPokemonDetails|null>(null);
    const [color, setColor] = useState<Array<Array<number>>>([]);

    useEffect(() => {
        fetchPokemonDetailsByPokemonName(pokemon.name)
            .then(result => setDetail(result));
    }, []);

    useEffect(() => {
        if(!detail) return;

        prominent(detail.sprites.front_default).then((c) => {
            setColor(c as []);
        })
    }, [detail]);

    if(!detail) {
        return (
            <Card>
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Image src="https://media.tenor.com/fMjcC9kIwCYAAAAi/pixel-art-rolling.gif" alt="loading" width={100} height={100}/>
                </div>
            </Card>
        )
    }

    return (
        <Card >
            <div className="circle" style={{background: `rgb(${color[1]?.join(' ') ?? 'transparent'})`}}></div>
            <Pokemon>
                <div className="img-box">
                    <Image src={detail?.sprites?.front_default as string} alt={pokemon.name} width={150} height={150} />
                </div>
                <h2>{pokemon.name} #{detail?.id}</h2>
                <Abilities>
                    <h4>Abilities</h4>
                    <div className="abilities">
                        {detail.abilities.map((ability) => (
                            <div key={ability.ability.name} className="ability" style={{background: `rgb(${color[1]?.join(' ') ?? 'transparent'})`, color: `rgb(${color[0]?.join(' ') ?? 'black'})`}}>
                                {ability.ability.name}
                            </div>
                        ))}
                    </div>
                </Abilities>
                <Stats>
                    <h4>Stats</h4>
                    <div className="stats">
                        {detail.stats?.map(stat => (
                            <div className="stat" key={stat.stat.name}>
                                <div>{stat.stat.name}</div>
                                <div></div>
                                <div>{stat.base_stat}</div>
                            </div>
                        ))}
                    </div>
                </Stats>
            </Pokemon>
        </Card>
    );
}

export default PokemonCard;