import React, { useState, useEffect, useContext } from 'react';
import ApiContext from 'common/ApiContext';
import PropTypes from 'prop-types';
import { Container, Filters, TableControls } from './ResourceListPage.styles';
import Card from 'components/Card';
import Dimmer from 'components/Dimmer';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa';
import Ajv from 'ajv';

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

    function onSort(e) {
        const column = e.target.textContent;
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

    function onPagePrev() {
        setQueryParams({
            ...queryParams,
            page: queryParams.page - 1
        });
    }

    function onPageNext() {
        setQueryParams({
            ...queryParams,
            page: queryParams.page + 1
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

    function PaginationControl() {
        let showPrev = false;
        let showNext = false;
        if (queryParams.page > 1) showPrev = true;
        if (listData.length >= 20) showNext = true;
        
        return (
            <Pagination>
                {(showPrev) && <button onClick={onPagePrev}>Previous</button>}
                <span><b>{queryParams.page}</b></span>
                {(showNext) && <button onClick={onPageNext}>Next</button>}
            </Pagination>
        );
    }

    return (
        <Container>

            <Card>
                {isLoading && <Dimmer />}
                <h3>{resource.label}</h3>

                <Filters>
                    <span>
                        <strong>Filters (Maximum: {maxFilters})</strong>
                        <button title='Search with filters' onClick={onSearch}><FaSearch /></button>
                        <button title='Add filter' onClick={onFilterAdd}><FaPlus /></button>
                        <button title='Clear filters' onClick={onFilterClear}><FaTimes /></button>
                    </span>

                    <form onSubmit={onSearch}>
                        {filters.map((filter, i) => <div key={i}>
                            <span>{i + 1}: </span>
                            <select value={filter.column} onChange={(e) => onFilterColumnChange(e, i)}>
                                {headers.map(column => <option key={column} value={column}>
                                    {column}
                                </option>)}
                            </select>

                            <select value={filter.operator} onChange={(e) => onFilterOperatorChange(e, i)}>
                                {getOperators(filter.column).map(operator => <option key={operator.label} value={operator.value}>
                                    {operator.label}
                                </option>)}
                            </select>

                            <div className={`filter-input ${(filter.error) ? 'error' : null}`}>
                                <input type='text' value={filter.value} onChange={(e) => onFilterValueChange(e, i)} />
                                {filter.error && <label>{filter.error}</label>}
                            </div>

                            <button type="button" title='Delete filter' onClick={(e) => onFilterDelete(e, i)}><FaTimes /></button>
                        </div>)}
                        <input type='submit' />
                    </form>
                </Filters>

                <TableControls>
                    <PaginationControl />
                    <b>Showing {listData.length} items</b>
                </TableControls>

                <Table>
                    <thead>
                        <tr>
                            {headers.map(column => <th
                                key={column}
                                onClick={onSort}
                                className={(column === queryParams.sort) ? (queryParams.reverse) ? 'desc' : 'asc' : null}
                            >
                                {column}
                            </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {listData.map(row => <tr key={row.id}>
                            {headers.map(column => <td key={column}>
                                {row[column]}
                            </td>)}
                        </tr>)}
                    </tbody>
                </Table>

                <TableControls>
                    <PaginationControl />
                </TableControls>

            </Card>
        </Container>
    );
}

ResourceListPage.propTypes = {
    baseUrl: PropTypes.string,
    resource: PropTypes.any
};

export default ResourceListPage;