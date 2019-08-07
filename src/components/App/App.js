import React, { useState, useEffect } from 'react';
import { ApiProvider } from 'common/ApiContext';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { GlobalStyle, Container, Content } from './App.styles';

import Navigation from 'components/Navigation';
import LoadingPage from 'pages/LoadingPage';
import HomePage from 'pages/HomePage';
import ResourceListPage from 'pages/ResourceListPage';
import NotFoundPage from 'pages/NotFoundPage';
import Api from 'common/Api';
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
            // console.log(swagger);

            setResources(swagger.tags.map(e => {
                const resource = e.name;
                const label = resource
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

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
        <ApiProvider value={api}>
            <Router>
                <GlobalStyle />

                {isLoading ? (
                    <LoadingPage />
                ) : (
                    <Container>
                        <Navigation>
                            <ul>
                                <li><Link to='/'><img src={logo} alt='Home' /></Link></li>
                                {resources.map(e => <li key={e.url}>
                                    <Link to={`/${e.url}`}>{e.label}</Link>
                                </li>)}
                            </ul>
                        </Navigation>

                        <Content>
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
                        </Content>
                    </Container>
                )}
            </Router>
        </ApiProvider>
    );
}

export default App;