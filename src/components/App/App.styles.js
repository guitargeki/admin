import styled, { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${styledNormalize}

    *, *:before, *:after {
        box-sizing: border-box;
    }

    body {
        background-color: #EEEEEE;
        margin: 0;
        padding: 0;
    }

    /* Some elements must have their font explicitly defined */
    html, body, button, input, textarea, textfield, select {
        font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
    }
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;

    @media only screen and (min-width: 37em) {
        grid-template-columns: auto minmax(0, 1fr);
        grid-template-rows: minmax(100vh, auto);
    }
`;

export const Content = styled.main`
    margin: 2em;
`;