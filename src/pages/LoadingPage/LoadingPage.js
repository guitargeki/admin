import React from 'react';
import { Container } from './LoadingPage.styles';
import Loader from 'components/Loader';

function LoadingPage() {
    return (
        <Container>
            <Loader />
            <p>Loading schemas...</p>
        </Container>
    );
}

export default LoadingPage;