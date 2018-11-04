import React from "react";
import styled from "styled-components";

const TextInput = styled.input.attrs({
    type: 'text',
    size: props => (props.small ? 5 : undefined),
  })`
    border-radius: 3px;
    width: 60%;
    border: 1px solid #B0B1B5;
    display: block;
    margin: 0 0 1em;
    padding: ${props => props.padding};
  
    ::placeholder {
      color: palevioletred;
    }
`;

export default TextInput;
