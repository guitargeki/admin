import React, { useReducer } from 'react';
import StateContext from 'contexts/StateContext';
import { Container } from './styles';
import Sidebar from 'containers/Sidebar';
import Content from 'containers/Content';
import resources from 'common/resources';
import baseUrls from 'common/base-urls';
import api from 'common/api';

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_BASE_URL':
            return {
                ...state,
                baseUrl: action.value
            };

        case 'CHANGE_RESOURCE':
            // Change resource and reset query params
            return {
                ...state,
                resource: action.value,
                queryParams: api.getDefaultQueryParams()
            };

        case 'CHANGE_SORT':
            if (action.value === state.queryParams.sort) {
                const queryParams = { ...state.queryParams, reverse: !state.queryParams.reverse };
                return { ...state, queryParams };
            } else {
                const queryParams = { ...state.queryParams, sort: action.value, reverse: false };
                return { ...state, queryParams };
            }

        case 'CHANGE_PAGE':
            return {
                ...state,
                queryParams: {
                    ...state.queryParams,
                    page: action.value
                }
            };

        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, {
        baseUrl: baseUrls[0],
        resource: resources[0].urlName,
        queryParams: api.getDefaultQueryParams()
    });
    

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            <Container>
                <Sidebar />
                <Content />
            </Container>
        </StateContext.Provider>
    );
}

export default App;