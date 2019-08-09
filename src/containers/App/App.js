import React, { useState, useEffect } from 'react';
import { ApiProvider } from 'common/ApiContext';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Wrapper } from './App.styles';
import theme from 'themes/default';

import { Box } from 'components';
import Navigation from 'components/Navigation';

import HomePage from 'pages/HomePage';
import LoadingPage from 'pages/LoadingPage';
import NotFoundPage from 'pages/NotFoundPage';
import ResourceListPage from 'pages/ResourceListPage';

import Api from 'common/Api';
import * as utility from 'common/utility';
import logo from 'static/logo-light.png';

const baseUrls = [
    'https://api.guitargeki.com/v1/',
    'https://localhost/v1/'
];

function App() {
    const api = useState(new Api(baseUrls[0]))[0];
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Recreate resources if the base URL changes
    useEffect(() => {
        async function createResources() {
            const swagger = await api.getSwagger();

            setResources(swagger.tags.map(e => {
                const resource = e.name;
                const label = utility.getFriendlyColumnName(resource);

                const schemas = {};
                schemas.getList = swagger.paths[`/${resource}`].get.responses['200'].schema;

                return {
                    label,
                    url: resource,
                    schemas
                };
            }));

            setIsLoading(false);
        }
        setIsLoading(true);
        createResources();
    }, [api, api.baseUrl]);

    return (
        <ThemeProvider theme={theme}>
            <ApiProvider value={api}>
                <Router>
                    <GlobalStyle />

                    {isLoading && <LoadingPage />}

                    {!isLoading && <Wrapper>
                        <Navigation>
                            <ul>
                                <li><Link to='/'><img src={logo} alt='Home' /></Link></li>
                                {resources.map(e => <li key={e.url}>
                                    <Link to={`/${e.url}`}>{e.label}</Link>
                                </li>)}
                            </ul>
                        </Navigation>

                        <Box as='main' p='l'>
                            <Switch>
                                <Route path="/" exact component={HomePage} />

                                {resources.map(e => <Route
                                    key={e.url}
                                    path={`/${e.url}`}
                                    component={() => <ResourceListPage
                                        resource={e}
                                    />}
                                />)}

                                <Route component={NotFoundPage} />
                            </Switch>
                        </Box>
                    </Wrapper>}
                </Router>
            </ApiProvider>
        </ThemeProvider>
    );
}

export default App;