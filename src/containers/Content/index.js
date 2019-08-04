import React, { useContext } from 'react';
import StateContext from 'contexts/StateContext';
import { Container } from './styles';
import { Dropdown } from 'semantic-ui-react';
import ListTable from 'containers/ListTable';
import baseUrls from 'common/base-urls';

const baseUrlOptions = [];
for (const url of baseUrls) {
    baseUrlOptions.push({
        text: url,
        value: url
    });
}

function Content() {
    const { state, dispatch } = useContext(StateContext);

    return (
        <Container>
            <label>Base URL: </label>
            <Dropdown
                selection
                defaultValue={state.baseUrl}
                options={baseUrlOptions}
                onChange={(e, data) => dispatch({
                    type: 'CHANGE_BASE_URL',
                    value: data.value
                })}
            />

            <ListTable />
        </Container>
    );
}

export default Content;