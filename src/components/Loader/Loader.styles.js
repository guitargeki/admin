import styled from 'styled-components';

export const Container = styled.div`
    --thickness: 0.5em;
    border: var(--thickness) solid rgba(0, 0, 0, 0);
    border-top: var(--thickness) solid grey;
    border-radius: 50%;
    width: 4em;
    height: 4em;
    animation: spin 0.75s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;