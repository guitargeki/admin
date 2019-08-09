import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components';

function Image(props) {
    const { centered, ...rest } = props;
    return (
        <Box
            as='img'
            display='block'
            mx={centered && 'auto'}
            {...rest}
        />
    );
}

Image.propTypes = {
    centered: PropTypes.bool
};

export default Image;