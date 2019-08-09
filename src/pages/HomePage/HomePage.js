import React from 'react';
import { Card, Flex, Image, Page } from 'components';

import { siteTitle } from 'common/labels';
import logo from 'static/logo-dark.png';
import websiteSnippet from './website-snippet.png';

function HomePage() {
    return (
        <Page title={`Home | ${siteTitle}`}>
            <Flex justifyContent='center'>
                <Card maxWidth={768}>
                    <Image src={logo} width='75%' centered />
                    <p>Welcome to the admin panel for Guitargeki! You can use this site to browse all Guitargeki data.</p>
                    <p>At the moment, this site can only <i>display</i> Guitargeki data. In the future, admins will be able to create and update data. This site automatically constructs pages based on the Swagger specification pulled from the <a href='https://api.guitargeki.com/v1/docs'>API</a>. This allows the schema to always be in sync with the API and also allows for easy client-side validation.</p>
                    <p>An official Guitargeki website is also in the works. <a href={websiteSnippet}>Here&#39;s</a> a snippet of what it looks like.</p>
                </Card>
            </Flex>
        </Page>
    );
}

export default HomePage;