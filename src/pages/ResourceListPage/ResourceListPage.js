import React, { useState, useEffect, useContext } from 'react';
import ApiContext from 'common/ApiContext';
import PropTypes from 'prop-types';
import { Box, Button, Card, Dimmer, Flex, Input, Loader, Page, Pagination, Segment, Select } from 'components';
import { siteTitle } from 'common/labels';
import Table from 'components/Table';
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa';
import Ajv from 'ajv';
import * as utility from 'common/utility';

const ajv = new Ajv({ coerceTypes: true });
const maxFilters = 5;

const numberOperators = [
    {
        label: 'equal to',
        value: '='
    },
    {
        label: 'not equal to',
        value: '!='
    },
    {
        label: 'greater than',
        value: '>'
    },
    {
        label: 'less than',
        value: '<'
    }
];

const stringOperators = [
    {
        label: 'contains',
        value: 'ILIKE'
    }
];

const limits = [
    '5',
    '10',
    '15',
    '20'
];

function ControlSegment(props) {
    return (
        <Segment bg='muted' {...props} />
    );
}

function SpacedControls(props) {
    return (
        <Flex alignItems='center' justifyContent='space-between' flexWrap='wrap' {...props} />
    );
}

function FilterHeaderButton(props) {
    return (
        <Segment
            as={Button}
            px='m'
            py='s'
            borderRadius='s'
            {...props}
        />
    );
}

function FilterSegment(props) {
    return (
        <Segment
            marginTop='s'
            px='s'
            py='xs'
            borderRadius='s'
            {...props}
        />
    );
}

function ResourceListPage(props) {
    const { resource } = props;

    const api = useContext(ApiContext);
    const [schema, setSchema] = useState(resource.schemas.getList.items.properties);
    const [headers, setHeaders] = useState(Object.keys(schema));
    const [listData, setListData] = useState([]);
    const [queryParams, setQueryParams] = useState(api.getDefaultQueryParams());
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState([]);

    // Reload schema and headers if resource changes (usually when baseUrl changes)
    useEffect(() => {
        const newSchema = resource.schemas.getList.items.properties;
        setSchema(newSchema);
        setHeaders(Object.keys(newSchema));
    }, [resource]);

    // Reload list when any params change
    useEffect(() => {
        let _isMounted = true;
        async function getData() {
            const data = await api.getList(resource.url, queryParams);

            if (_isMounted) {
                if (!data.error) {
                    setListData(data);
                } else {
                    console.log(data);
                }

                setIsLoading(false);
            }
        }
        setIsLoading(true);
        getData();

        return () => _isMounted = false;
    }, [api, api.baseUrl, resource.url, queryParams]);

    function onSearch(e) {
        e.preventDefault();

        // Validate values for each filter
        let containsError = false;
        setFilters(filters.map(filter => {
            const isValid = ajv.validate(schema[filter.column], filter.value);

            if (!isValid) {
                filter.error = ajv.errors[0].message;
                containsError = true;
            } else {
                delete filter.error;
            }

            return filter;
        }));

        // Only perform search if all filters are valid
        if (!containsError) {
            setQueryParams({
                ...queryParams,
                filters
            });
        }
    }

    function onFilterClear(e) {
        setFilters([]);
    }

    function onFilterAdd(e) {
        if (filters.length < maxFilters) {
            const array = [...filters];
            array.push({
                column: headers[0],
                operator: getOperators(headers[0])[0].value,
                value: ''
            });
            setFilters(array);
        }
    }

    function onFilterDelete(e, index) {
        const array = filters.filter((item, i) => {
            return i !== index;
        });

        setFilters(array);
    }

    function onFilterColumnChange(e, index) {
        const array = [...filters];
        const target = array[index];
        target.column = e.target.value;
        target.operator = getOperators(target.column)[0].value;
        delete target.error;
        setFilters(array);
    }

    function onFilterOperatorChange(e, index) {
        const array = [...filters];
        array[index].operator = e.target.value;
        setFilters(array);
    }

    function onFilterValueChange(e, index) {
        const array = [...filters];
        array[index].value = e.target.value;
        setFilters(array);
    }

    function onSort(column) {
        let sort = queryParams.sort;
        let reverse = queryParams.reverse;

        if (sort === column) {
            reverse = !reverse;
        } else {
            sort = column;
            reverse = false;
        }

        setQueryParams({
            ...queryParams,
            sort,
            reverse
        });
    }

    function onPageChange(newPage) {
        setQueryParams({
            ...queryParams,
            page: newPage
        });
    }

    function onLimitChange(e) {
        setQueryParams({
            ...queryParams,
            limit: e.target.value
        });
    }

    function getOperators(column) {
        const schema = resource.schemas.getList.items.properties;
        if (schema[column].type === 'string' && !schema[column].format) {
            return stringOperators;
        } else {
            return numberOperators;
        }
    }

    function isColumnUrl(column) {
        const format = schema[column]['x-format'];
        if (format && format.uri) return true;
        return false;
    }

    function PaginationControl() {
        return (
            <Pagination
                page={queryParams.page}
                onPageChange={onPageChange}
                isLastPage={(listData.length < queryParams.limit)}
            />
        );
    }

    return (
        <Page title={`${resource.label} | ${siteTitle}`}>
            <>
                <Card as='article'>
                    <h2>{resource.label}</h2>
                    <Segment.Group as='section' vertical>

                        <ControlSegment>
                            <Box as='header'>
                                <b>Filters&nbsp;</b>
                                <Segment.Group inline fontSize='xs'>
                                    <FilterHeaderButton title='Search with filters' onClick={onSearch}><FaSearch /></FilterHeaderButton>
                                    <FilterHeaderButton title='Add filter' onClick={onFilterAdd}><FaPlus /></FilterHeaderButton>
                                    <FilterHeaderButton title='Clear filters' onClick={onFilterClear}><FaTimes /></FilterHeaderButton>
                                </Segment.Group>
                            </Box>

                            <form onSubmit={onSearch}>
                                {filters.map((filter, i) => <Flex key={i} alignItems='center' fontSize='xs'>
                                    <Segment.Group>
                                        <FilterSegment as={Select} value={filter.column} onChange={(e) => onFilterColumnChange(e, i)}>
                                            {headers.map(column => <option key={column} value={column}>
                                                {utility.getFriendlyColumnName(column)}
                                            </option>)}
                                        </FilterSegment>

                                        <FilterSegment as={Select} value={filter.operator} onChange={(e) => onFilterOperatorChange(e, i)}>
                                            {getOperators(filter.column).map(operator => <option key={operator.label} value={operator.value}>
                                                {operator.label}
                                            </option>)}
                                        </FilterSegment>

                                        <FilterSegment as={Input} type='text' value={filter.value} onChange={(e) => onFilterValueChange(e, i)} error={filter.error && true} />
                                        <FilterSegment as={Button} type='button' title='Delete filter' onClick={(e) => onFilterDelete(e, i)}><FaTimes /></FilterSegment>

                                    </Segment.Group>
                                    &nbsp;{filter.error && <Box as='i' color='red'>{filter.error}</Box>}

                                </Flex>)}
                                <input type='submit' style={{ display: 'none' }} />
                            </form>
                        </ControlSegment>

                        <ControlSegment>
                            <SpacedControls>
                                <b>Showing {listData.length} items</b>
                                <PaginationControl />
                            </SpacedControls>
                        </ControlSegment>

                        <Segment>
                            <Dimmer active={isLoading}><Loader active={isLoading}>Loading data...</Loader></Dimmer>

                            <Table fontSize='s'>
                                <thead>
                                    <tr>
                                        {headers.map(column => <th
                                            key={column}
                                            onClick={() => onSort(column)}
                                            className={(column === queryParams.sort) ? (queryParams.reverse) ? 'desc' : 'asc' : null}
                                        >
                                            {utility.getFriendlyColumnName(column)}
                                        </th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {listData.map(row => <tr key={row.id}>
                                        {headers.map(column => <td key={column}>
                                            {(isColumnUrl(column)) ? <a href={row[column]} target='_blank' rel='noopener noreferrer'>{row[column]}</a> : row[column]}
                                        </td>)}
                                    </tr>)}
                                </tbody>
                            </Table>
                        </Segment>

                        <ControlSegment>
                            <SpacedControls>
                                <Box>
                                    <FilterSegment as={Select} value={queryParams.limit} onChange={(e) => onLimitChange(e)} borderRadius='xs' marginTop='0'>
                                        {limits.map(limit => <option key={limit} value={limit}>
                                            {limit}
                                        </option>)}
                                    </FilterSegment>
                                    <span> per page</span>
                                </Box>
                                <PaginationControl />
                            </SpacedControls>
                        </ControlSegment>
                    </Segment.Group>

                </Card>
            </>
        </Page>
    );
}

ResourceListPage.propTypes = {
    baseUrl: PropTypes.string,
    resource: PropTypes.any
};

export default ResourceListPage;