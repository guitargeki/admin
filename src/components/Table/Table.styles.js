import styled from 'styled-components';

export const Container = styled.table`
    display: block;
    width: 100%;
    height: 1fr;
    text-align: left;
    overflow: auto;
    border-collapse: collapse;
    font-size: 0.8em;

    th {
        background-color: #EEEEEE;
        font-weight: 600;
    }

    th.asc:after {
        content: '▴';
    }

    th.desc:after {
        content: '▾';
    }

    th:hover {
        filter: brightness(90%);
        cursor: pointer;
    }

    tr:hover {
        background-color: #EEEEEE;
    }

    th, td {
        padding: 0.75em;
        width: 1%;
    }

    td {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-left: none;
        border-right: none;
    }
`;