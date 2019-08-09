import React from 'react';
import { Wrapper, Group } from './Segment.styles';

function Segment(props) {
    return (
        <Wrapper
            border='default'
            borderRadius='m'
            padding='m'
            {...props}
        />
    );
}

Segment.Group = Group;

export default Segment;