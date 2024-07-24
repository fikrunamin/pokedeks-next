import styled from "styled-components";
import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label ?: string;
}

const Label = styled.label`
    display: block;
    width: 100%;
    
    & > div {
        font-weight: normal;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        
        @media (prefers-color-scheme: dark) {
            color: white;
        }
    }
    
    & > input {
        padding: 0.75rem 1rem;
        display: block;
        width: 100%;
        border: 1px solid rgb(229 231 235);
        border-radius: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        
        &:focus {
            --tw-ring-color: rgb(59 130 246);
            border-color: rgb(59 130 246);
        }
        
        &:disabled {
            opacity: 0.5;
            pointer-events: none;
        }
        
        @media (prefers-color-scheme: dark) {
            background-color: rgb(23 23 23);
            color: rgb(163 163 163);
            border-color: rgb(64 64 64);
            
            &::placeholder {
                color: rgb(115 115 115);
            }
            
            &:focus {
                --tw-ring-color: rgb(82 82 82);
            }
        }
    }
`;

function Input(props: IInputProps) {
    return <Label>
        {props.label && <div>{props.label}</div>}
        <input {...props} />
    </Label>;
}

export default Input;