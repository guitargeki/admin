import React from 'react';
import { Container, StyledCard as Card, Logo } from './HomePage.styles';
import logo from 'static/logo-dark.png';
import websiteSnippet from './website-snippet.png';

function HomePage() {
    return (
        <Container>
            <Card>
                <Logo src={logo} />
                <p>Welcome to the admin panel for Guitargeki! You can use this site to browse all Guitargeki data.</p>
                <p>At the moment, this site can only <i>display</i> Guitargeki data. In the future, admins will be able to create and update data. An official Guitargeki website is also in the works. <a href={websiteSnippet}>Here&#39;s</a> a snippet of what it would look like.</p>
                <h2>What is Guitargeki?</h2>
                <p>Guitargekis are competitive events where guitarists submit audio/video performances of a pre-chosen theme/song. At the end of each match or event, a panel of judges will vote for their favourite submission or rate each submission. The winner is the submission with the highest number of votes or rating. Currently, all events are manually managed in a private Discord server.</p>
            </Card>
        </Container>
    );
}

export default HomePage;