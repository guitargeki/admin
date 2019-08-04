import React, { useContext } from 'react';
import StateContext from 'contexts/StateContext';
import { Container, Menu } from './styles';
import resources from 'common/resources';

function Sidebar() {
    const { state, dispatch } = useContext(StateContext);

    // Create menu items
    const items = [];
    for (const item of resources) {
        items.push((<Menu.Item
            key={item.urlName}
            onClick={() => dispatch({
                type: 'CHANGE_RESOURCE',
                value: item.urlName
            })}
            active={state.resource === item.urlName}
        >
            {item.name}
        </Menu.Item>));
    }

    return (
        <Container>
            <Menu vertical inverted fluid>
                {items}
            </Menu>
        </Container>
    );
}

export default Sidebar;