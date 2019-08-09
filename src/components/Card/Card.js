import React from 'react';
import { Box } from 'components';

function Card(props) {
    return (
        <Box
            bg='white'
            p='l'
            boxShadow={2}
            {...props}
        />
    );
}

export default Card;