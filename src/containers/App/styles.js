import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: minmax(100vh, 100%);
    grid-template-areas: 
        "nav content";
`;