import React from 'react';
import Page from 'components/Page';
import { siteTitle } from 'common/labels';
import { Card } from 'components';

function NotFoundPage() {
    return (
        <Page title={`Not Found | ${siteTitle}`}>
            <Card as='article'><p>Page not found!</p></Card>
        </Page>
    );
}

export default NotFoundPage;