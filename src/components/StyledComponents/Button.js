import styled from "styled-components";

export const Button = styled.button`
border: 1px none #ff6a14;
color: ${props => props.disabled ? '#a7a7a7' : '#ff5100'};
background-color: #000;
border-radius: 5px;
font-size: 15px;
padding: 5px 8px 5px 8px;
margin: 20px;
${props => !props.disabled && `&:hover {
    background-color: #ddd;
    color: black;
}`}
`;