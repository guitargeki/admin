import styled from 'styled-components';
import { Table as NormalTable } from 'semantic-ui-react';

export const Container = styled.div`

`;

export const Table = styled(NormalTable)`
    display: block;
    overflow: auto;
    
    th, td {
        width: 1%;
    }
`;