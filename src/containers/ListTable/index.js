import React, { useState, useEffect, useContext } from 'react';
import StateContext from 'contexts/StateContext';
import { Pagination, Segment, Message } from 'semantic-ui-react';
import { Container, Table } from './styles';
import api from 'common/api';

function ListTable() {
    const { state, dispatch } = useContext(StateContext);
    const [listData, setListData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Re-fetch data when part of the URL changes
    useEffect(() => {
        async function getData() {
            try {
                const data = await api.getList(state.resource, state.queryParams, state.baseUrl);
                setListData(data);
                setIsLoading(false);
                setError();

                // Cache headers
                if (data && data.length > 0) {
                    setHeaders(Object.keys(data[0]));
                }
            } catch (error) {
                // Reset if something went wrong with fetching data
                setListData([]);
                setHeaders([]);
                setIsLoading(false);
                setError(error);
            }
        }
        setIsLoading(true);
        getData();
    }, [state.resource, state.queryParams, state.baseUrl]);

    // Create header cells
    const headerCells = [];
    for (const header of headers) {
        headerCells.push((
            <Table.HeaderCell
                key={header}
                sorted={(state.queryParams.sort === header) ? (state.queryParams.reverse) ? 'descending' : 'ascending' : null}
                onClick={() => dispatch({
                    type: 'CHANGE_SORT',
                    value: header
                })}
            >
                {header}
            </Table.HeaderCell>
        ));
    }

    // Create rows
    const rows = [];
    for (const row of listData) {
        rows.push((
            <Table.Row key={row.id}>
                {headers.map(header => <Table.Cell key={header}>
                    {row[header]}
                </Table.Cell>)}
            </Table.Row>
        ));
    }

    // Remove prev/next buttons if no more rows or on first page
    let totalPages = 1;
    if (listData.length > 0) {
        if (listData.length < state.queryParams.limit) {
            totalPages = state.queryParams.page;
        } else {
            totalPages = state.queryParams.page + 1;
        }
    }

    return (
        <Segment loading={isLoading}>
            {error ? (<Message negative><p>{error.message}</p></Message>) :
                (<>
                    <Table sortable celled selectable>
                        <Table.Header>
                            <Table.Row>
                                {headerCells}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {rows}
                        </Table.Body>
                    </Table>

                    <Pagination
                        boundaryRange={0}
                        activePage={state.queryParams.page}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        prevItem={(state.queryParams.page === 1) ? null : {
                            'aria-label': 'Previous item',
                            content: '<',
                        }}
                        nextItem={(totalPages === state.queryParams.page) ? null : {
                            'aria-label': 'Next item',
                            content: '>',
                        }}
                        siblingRange={0}
                        totalPages={totalPages}
                        onPageChange={(e, { activePage }) => dispatch({
                            type: 'CHANGE_PAGE',
                            value: activePage
                        })}
                    />
                </>)}
        </Segment>
    );
}

export default ListTable;