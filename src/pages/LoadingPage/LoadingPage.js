import React from 'react';
import { Flex, Loader, Page } from 'components';
import { siteTitle } from 'common/labels';

function LoadingPage() {
    return (
        <Page title={siteTitle}>
            <Flex alignItems='center' justifyContent='center' width='100vw' height='100vh'>
                <Loader active>Loading schemas...</Loader>
            </Flex>
        </Page>
    );
}

export default LoadingPage;