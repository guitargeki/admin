import styled from 'styled-components';
import { Box } from 'components';

export const Animation = styled(Box)`
    --thickness: 0.5em;
    border: var(--thickness) solid rgba(0, 0, 0, 0);
    border-top: var(--thickness) solid grey;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    text-align: center;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const Label = styled.label`
    margin-top: ${props => props.theme.space.s};
`;