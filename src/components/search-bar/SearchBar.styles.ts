import styled from 'styled-components/native';

export const SearchInput = styled.TextInput`
    align-self: center;
    color: #81d4fa;
    font-size: 20px;
    text-align: center;
    width: 70%;
    margin-right: 0;
    border-color: transparent;
    border-bottom-color: rgba(129, 212, 250, 0.5);
    border-width: 2px;
    padding: 5px;
    border-radius: 3px;

    &:focus {
        border-bottom-color: rgba(129, 212, 250, 1);
    }
`;
