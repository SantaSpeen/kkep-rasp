import React from 'react';
import {Group} from "@vkontakte/vkui";

import Header from "@vkontakte/vkui/dist/components/Header/Header";
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

class User extends React.Component {

    render() {
        return (
            <Group>
                <p align='center'>В разработке</p>
                    <Group>
                        <Header mode="secondary">О тебе</Header>
                        <SimpleCell
                            description={this.props.appState.group_name}
                            before={<Avatar src={this.props.appState.avatar}/>}
                        >
                            {this.props.appState.name}
                        </SimpleCell>
                    </Group>
            </Group>
        )
    }
}

export default User;