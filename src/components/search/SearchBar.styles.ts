import styled from 'styled-components/native';

interface SearchInputProps {
    isFocused: boolean;
}
export const SearchInput = styled.TextInput<SearchInputProps>`
    align-self: center;
    color: #81d4fa;
    font-size: 20px;
    text-align: center;
    width: 70%;
    margin-right: 0;
    padding: 5px;
    border-radius: 3px;
    border-width: 2px;
    border-color: transparent;
    border-bottom-color: ${(props) =>
        props.isFocused
            ? 'rgba(129, 212, 250, 1)'
            : 'rgba(129, 212, 250, 0.5)'};
`;
