import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './Button.styles';

function Button(props) {
    return (
        <Wrapper
            as='button'
            border='0'
            borderRadius='s'
            bg='gray'
            px='m'
            py='s'
            {...props}
        />
    );
}

Button.propTypes = {
    children: PropTypes.any
};

export default Button;