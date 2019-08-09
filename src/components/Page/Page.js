import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Page(props) {
    const { title, children } = props;

    // Set page title
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            {children}
        </>
    );
}

Page.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
};

export default Page;