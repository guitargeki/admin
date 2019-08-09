import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'components';

const buttonBg = 'white';

function PaginationButton(props) {
    return (
        <Segment
            as={Button}
            borderRadius='s'
            bg={buttonBg}
            py='s'
            {...props}
        />
    );
}

function Pagination(props) {
    const {
        page,
        siblingRange,
        onPageChange,
        isLastPage
    } = props;

    // Create page buttons
    const pageButtons = [];
    for (let i = page - siblingRange; i <= page + siblingRange; i++) {
        if (i < 1) continue;
        if (isLastPage && i === page + siblingRange) continue;

        if (i === page) {
            pageButtons.push((
                <PaginationButton
                    key={i}
                    as='div'
                    bg='primary'
                    color='white'
                >
                    {i}
                </PaginationButton>
            ));
        } else {
            pageButtons.push((
                <PaginationButton key={i} onClick={() => onPageChange(i)}>
                    {i}
                </PaginationButton>
            ));
        }
    }

    return (
        <Segment.Group>
            <PaginationButton
                onClick={() => onPageChange(page - 1)}
                disabled={(page === 1)}
            >
                Prev
            </PaginationButton>

            {pageButtons}

            <PaginationButton
                onClick={() => onPageChange(page + 1)}
                disabled={isLastPage}
            >
                Next
            </PaginationButton>
        </Segment.Group>
    );
}

Pagination.propTypes = {
    page: PropTypes.number,
    siblingRange: PropTypes.number,
    onPageChange: PropTypes.func,
    isLastPage: PropTypes.bool
};

Pagination.defaultProps = {
    page: 1,
    siblingRange: 1
};

export default Pagination;