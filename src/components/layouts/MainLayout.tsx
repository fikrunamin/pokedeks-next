import React from "react";
import {Inter} from "next/font/google";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "../ui";

interface IMainLayout {
    children: React.ReactNode;
}

const inter = Inter({subsets: ['latin']});

const Container = styled.div`
    height: 100%;
    width: 100%;
`;

const ExitButton = styled(Link)`
    width: fit-content;
    display: grid;
    place-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%; 
    border-width: 1px; 
    border-color: #E5E7EB; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    font-weight: 500; 
    color: #1F2937; 
    background-color: #ffffff; 
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 

    &:hover {
        background-color: #F9FAFB; 
    }
`

function MainLayout({children}: IMainLayout) {
    return (
        <Container className={inter.className}>
            <div style={{display: 'grid', placeContent: 'center', marginTop: '2rem'}}>
                <ExitButton href="/api/v1/exit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: 24, height: 24}}>
                        <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </ExitButton>
            </div>
            {children}
        </Container>
    );
}

export default MainLayout;