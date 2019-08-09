import styled from 'styled-components';
import {
    space,
    color,
    typography,
    layout,
    flexbox,
    grid,
    background,
    border,
    position,
    shadow
} from 'styled-system';

const Wrapper = styled.div`
    ${space}
    ${color}
    ${typography}
    ${layout}
    ${flexbox}
    ${grid}
    ${background}
    ${border}
    ${position}
    ${shadow}

    box-sizing: border-box;
    min-width: 0;
`;

export default Wrapper;