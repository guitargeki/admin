import styled from 'styled-components';
import { Box } from 'components';

export const Wrapper = styled(Box)`
    :hover:enabled {
        filter: brightness(90%);
        cursor: pointer;
    }

    :disabled {
        opacity: 0.5;
    }
`;