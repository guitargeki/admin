import React from 'react';
import PropTypes from 'prop-types';
import { Animation, Label } from './Loader.styles';
import { Flex } from 'components';

function Loader(props) {
    const { children, active, ...rest } = props;

    if (!active) {
        return (<></>);
    }

    return (
        <Flex inline flexDirection='column' alignItems='center'>
            <Animation
                width='4em'
                height='4em'
                {...rest}
            />
            <Label>{children}</Label>
        </Flex>
    );
}

Loader.propTypes = {
    children: PropTypes.any,
    active: PropTypes.bool
};

export default Loader;