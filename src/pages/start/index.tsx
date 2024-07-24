import AuthLayout from "@/components/layouts/AuthLayout";
import {Button, Input} from "@/components/ui";
import styled from "styled-components";
import {FormEvent, useState} from "react";
import { useRouter } from "next/router";
import { DangerAlert } from "@/components/ui/Alert";
import Image from "next/image";
import type { GetServerSideProps } from "next";

const Container = styled.div`
    max-width: 480px;
    width: 480px;
    display: flex;
`;

const Form = styled.form`
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: white;
    border-width: 1px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border-radius: 0.75rem;
    padding: 1rem;

    @media (prefers-color-scheme: dark) {
        --tw-shadow-color: #404040;
        background: rgb(23 23 23);
        border-color: rgb(64 64 64);
    }

    @media screen and (min-width: 600px) {
        padding: 1.75rem;
    }
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

function Start() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        username?: string | string[]
    }>({});

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const response = await fetch('/api/v1/start', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        }).then(response => response.json());


        if(response.errors) {
            setLoading(false);
            return setErrors(response.errors);
        }

        router.push('/pokemon');
    }

    return (
        <AuthLayout>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Title>Pokedeks</Title>
                    <div>
                        <Image 
                            alt="welcome" 
                            width={150} 
                            height={150} 
                            src="https://media.tenor.com/Xe5FdTf3vq8AAAAj/pikachu-pokemon.gif"
                            style={{margin: '0 auto'}}
                            draggable="false"
                        />
                    </div>
                    {errors?.username && (
                        <DangerAlert message={errors.username[0]} />
                    )}
                    <Input label="Username" type="text" name="username" placeholder="Username" />
                    {!loading ? (
                        <Button>Start</Button>
                    ) : (
                        <Button disabled>Starting...</Button>
                    ) }
                </Form>
            </Container>
        </AuthLayout>
    );
}

export const getServerSideProps = (async ({req}) => {
    if(req.cookies.username?.length) {
        return {
            redirect: {
                destination: '/pokemon',
                permanent: false,
            }
        }
    }
    
    return {props: {}};
}) satisfies GetServerSideProps<{}>

export default Start;