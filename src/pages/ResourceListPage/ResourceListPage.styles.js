import styled from 'styled-components';

export const Container = styled.article`
    width: 100%;
    height: 100%;
`;

export const Filters = styled.div`
    font-size: 0.8em;
    margin-bottom: 1em;
    
    input {
        padding-left: 0.5em;
    }

    input[type="submit"] {
        display: none;
    }

    select, input {
        border: 1px solid lightgray;
    }

    select, input, button {
        height: 2.25em;
        margin: 0.2em;
    }

    button {
        border: none;
        background-color: rgba(0, 0, 0, 0);
    }

    button:hover {
        cursor: pointer;
        background-color: lightgray;
    }

    .filter-input {
        display: inline-flex;
        flex-direction: column;

        label {
            padding-left: 0.5em;
            padding-bottom: 0.5em;
            font-size: 0.9em;
        }
    }

    .error {
        color: red;

        input {
            border-color: red;
            background-color: #FFEEEE;
        }
        
        
    }
`;

export const TableControls = styled.div`
    padding: 1em 0.5em;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;