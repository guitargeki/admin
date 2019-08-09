
import styled, { css } from 'styled-components';
import { Box, Flex } from 'components';

export const Wrapper = styled(Box)`
    
`;

export const Group = styled(Flex)`
    ${props => !props.vertical && css`
        & > ${Wrapper} {
            :not(:first-child) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            :not(:last-child) {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }

        & > ${Wrapper} + ${Wrapper} {
            border-left: 0;
        }
    `}

    ${props => props.vertical && css`
        flex-direction: column;

        & > ${Wrapper} {
            :not(:first-child) {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }

            :not(:last-child) {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
        }

        & > ${Wrapper} + ${Wrapper} {
            border-top: 0;
        }
    `}
`;