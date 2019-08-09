import React from 'react';
import { Box } from 'components';

function Select(props) {
    return (
        <Box
            as='select'
            border='default'
            borderRadius='s'
            padding='s'
            {...props}
        />
    );
}

export default Select;