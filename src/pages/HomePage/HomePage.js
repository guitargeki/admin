import React from 'react';
import { Container, StyledCard as Card, Logo } from './HomePage.styles';
import logo from 'static/logo-dark.png';

function HomePage() {
    return (
        <Container>
            <Card>
                <Logo src={logo} />
                <p>Welcome to the admin panel for Guitargeki! You can use this site to browse all Guitargeki data.</p>
                <p>At the moment, this site can only <i>display</i> Guitargeki data. In the future, admins will be able to create and update data.</p>
            </Card>
        </Container>
    );
}

export default HomePage;