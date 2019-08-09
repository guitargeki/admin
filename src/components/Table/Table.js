import React from 'react';
import { Wrapper } from './Table.styles';

function Table(props) {
    return (
        <Wrapper
            as='table'
            minHeight='tableMinHeight'
            {...props}
        />
    );
}

export default Table;