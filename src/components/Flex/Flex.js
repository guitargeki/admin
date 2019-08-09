import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components';

function Flex(props) {
    const { inline, ...rest } = props;
    return (
        <Box
            display={(inline) ? 'inline-flex' : 'flex'}
            {...rest}
        />
    );
}

Flex.propTypes = {
    inline: PropTypes.bool
};

export default Flex;