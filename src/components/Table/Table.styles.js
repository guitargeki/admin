import styled from 'styled-components';
import { Box } from 'components';

export const Wrapper = styled(Box)`
    border-collapse: collapse;
    text-align: left;
    display: block;
    overflow: auto;

    td, th {
        padding: ${props => props.theme.space.m};
        width: 1%;
    }

    th {
        :hover {
            color: ${props => props.theme.colors.primary};
            cursor: pointer;
        }

        &.asc:after {
            content: '▴';
        }

        &.desc:after {
            content: '▾';
        }
    }

    tbody > tr {
        border-top: ${props => props.theme.borders.default};

        :hover {
            background-color: ${props => props.theme.colors.muted};
        }
    }
`;