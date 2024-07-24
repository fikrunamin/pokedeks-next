import React from "react";
import {Inter} from "next/font/google";
import styled from "styled-components";

interface IMainLayout {
    children: React.ReactNode;
}

const inter = Inter({subsets: ['latin']});

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;
    padding: 1rem;
`;

function AuthLayout({children}: IMainLayout) {
    return <Container className={inter.className}>{children}</Container>;
}

export default AuthLayout;