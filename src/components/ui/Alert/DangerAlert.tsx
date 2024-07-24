import styled from "styled-components";
import React from "react";

interface IDangerAlertProps {
    message: string;
    props?: React.ReactHTMLElement<HTMLDivElement>
}

const StyledAlert = styled.div`
    padding: 1rem; 
    margin-top: 0.5rem; 
    border-radius: 0.5rem; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    color: #ffffff; 
    background-color: #EF4444; 
`;

function DangerAlert({ message, props }: IDangerAlertProps) {
    return (
        <StyledAlert {...props} role="alert">
            {message}
        </StyledAlert>
    );
}

export default DangerAlert;