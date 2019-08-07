import styled from 'styled-components';

export const Container = styled.div`
    span {
        padding: 1em;
    }

    button {
        display: inline-block;
        padding: 0.5em;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    button:hover {
        filter: brightness(90%);
        cursor: pointer;
    }
`;