import React from 'react';

import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, Epic, Panel, PanelHeader, Root, View} from "@vkontakte/vkui";

import RaspTable from "./js/panel/Table";
import ErrorPage from "./js/panel/Error";

import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import {getGroupByVKId} from "./js/services/KKEP";
import TabbarItem from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";
import {Icon28MoreHorizontal, Icon28MoreVertical, Icon28User} from "@vkontakte/icons";
import Tabbar from "@vkontakte/vkui/dist/components/Tabbar/Tabbar";
import More from "./js/panel/More";
import User from "./js/panel/User";

class App extends React.Component {

    state = {
        group: 0,
        group_name: undefined,
        error: false,
        colorScheme: 'bright_light',

        name: "Not init name",
        avatar: 'https://vk.com/images/deactivated_100.png?ava=1',

        activeStory: 'rasp'
    }

    async componentDidMount() {

        const VKConnectCallback = async (e) => {

            if (e.detail.type === 'VKWebAppUpdateConfig') {
                bridge.unsubscribe(VKConnectCallback);

                const colorScheme = e.detail.data.scheme
                const user = await bridge.send('VKWebAppGetUserInfo')
                const name = user.first_name + " " + user.last_name
                const avatar = user.photo_100
                const groupList = await getGroupByVKId(user.id)

                if (groupList === null || groupList.length > 5)
                    this.setState({group: -1, error: true})

                else
                    if (groupList.length < 5)
                        this.setState({
                            group: parseInt(groupList[0].group_num),
                            group_name: groupList[0].name,
                            colorScheme: colorScheme,

                            name: name,
                            avatar: avatar
                        })
                    else
                        this.setState({group: -1, error: true})


                document.getElementById("body").setAttribute("scheme", colorScheme)

            }
        };

        bridge.subscribe(VKConnectCallback);
        // await bridge.send('VKWebAppInit', {})

        const groupList = await getGroupByVKId(370926160)
        console.log(groupList)
        if (groupList.length < 5)
            this.setState({
                group: parseInt(groupList[0].group_num),
                group_name: groupList[0].name,
                colorScheme: 'bright_light',
                name: "Максим Распутин"
            })
        else
            this.setState({group: -1, error: true})

        console.log(this.state)

    }

    render() {

        return (
            <ConfigProvider isWebView={true} colorScheme={this.state.colorScheme}>

                {this.state.group === 0 && <ScreenSpinner />}

                {this.state.group < 0 && <ErrorPage/>}

                {this.state.group > 0 &&
                <Epic  activeStory={this.state.activeStory} tabbar={<Tabbar>
                    <TabbarItem
                        onClick={() => this.setState({activeStory: 'rasp'})}
                        selected={this.state.activeStory === 'rasp'}
                    ><Icon28MoreVertical/></TabbarItem>
                    <TabbarItem
                        onClick={() => this.setState({activeStory: 'more'})}
                        selected={this.state.activeStory === 'more'}
                    ><Icon28MoreHorizontal/></TabbarItem>
                    <TabbarItem
                        onClick={() => this.setState({activeStory: 'user'})}
                        selected={this.state.activeStory === 'user'}
                    ><Icon28User/></TabbarItem>
                </Tabbar>}>

                    <Root id='rasp' activeView={this.state.activeStory}>
                        <View id='rasp' activePanel={this.state.activeStory}>
                            <Panel id="rasp">
                                <PanelHeader>Расписание</PanelHeader>

                                <RaspTable appState={this.state}/>

                            </Panel>
                        </View>
                    </Root>

                    <Root id='more' activeView={this.state.activeStory}>
                        <View id='more' activePanel={this.state.activeStory}>
                            <Panel id="more">
                                <PanelHeader>Доп. инфа</PanelHeader>

                                <More/>

                            </Panel>
                        </View>
                    </Root>

                    <Root id='user' activeView={this.state.activeStory}>
                        <View id='user' activePanel={this.state.activeStory}>
                            <Panel id="user">
                                <PanelHeader>User space</PanelHeader>

                                <User appState={this.state}/>

                            </Panel>
                        </View>
                    </Root>
                </Epic>
                }

            </ConfigProvider>
        );
    }
}

export default App;
