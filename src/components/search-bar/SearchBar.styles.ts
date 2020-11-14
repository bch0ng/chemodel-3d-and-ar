import styled from 'styled-components/native';

export const SearchInput = styled.TextInput`
    align-self: 'center',
    color: '#81D4FA',
    font-size: 20,
    text-align: 'center',
    width: '70%',
    margin-right: 0,
    border-color: 'transparent',
    border-bottom-color: 'rgba(129,212,250,0.5)',
    border-idth: 2,
    padding: 5,
    border-radius: 3
    
    &:focus {
      border-bottom-color: 'rgba(129,212,250,1)'
    }
`;
