import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components';

// eslint-disable-next-line react/display-name
const Input = forwardRef((props, ref) => {
    const { error, ...rest } = props;
    
    return (
        <Box
            ref={ref}
            as='input'
            bg={(error) ? 'lightpink' : 'white'}
            border='default'
            borderRadius='s'
            padding='s'
            {...rest}
        />
    );
});

Input.propTypes = {
    error: PropTypes.bool
};

export default Input;