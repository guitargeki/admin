import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components';

function Dimmer(props) {
    const { active, ...rest } = props;

    if (!active) {
        return (<></>);
    }

    return (
        <Flex
            bg='white'
            opacity='0.75'
            zIndex='dimmer'
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            alignItems='center'
            justifyContent='center'
            {...rest}
        />
    );
}

Dimmer.propTypes = {
    active: PropTypes.bool
};

export default Dimmer;