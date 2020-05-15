import React from 'react';
import {Admin} from 'react-admin';
import hasuraDataProvider from 'ra-data-hasura';

const headers = {
    'content-type': 'application/json'
};

const App = () => (
    <Admin
        dataProvider={hasuraDataProvider(process.env.HASURA_BASE_URL, headers)}
    >
    </Admin>
);

export default App;
