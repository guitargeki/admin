import styled from 'styled-components';

export const Wrapper = styled.nav`
    background-color: #32323D;
    color: white;
    font-size: 0.8em;
    

    & > ul {
        margin: 0;
        padding: 0;
        list-style: none;
        position: sticky;
        top: 0;
    }

    & > ul > li > a {
        padding: 1em;
        display: block;
        color: inherit;
        text-decoration: none;

        &:hover {
            background-color: #E54B4B;
        }
    }

    & > ul > li > a > img {
        width: 100px;
    }
`;