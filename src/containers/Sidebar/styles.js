import styled from 'styled-components';
import { Menu as NormalMenu } from 'semantic-ui-react';

export const Container = styled.div`
    grid-area: nav;
    position: sticky;
    top: 0;
    height: 100vh;
`;

export const Menu = styled(NormalMenu)`
    height: 100vh;
    border-radius: 0 !important;
`;