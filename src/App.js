import React from 'react';

import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, Panel, PanelHeader} from "@vkontakte/vkui";

import RaspTable from "./js/panel/Table";
import ErrorPage from "./js/panel/Error";

import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import {getGroupByVKId} from "./js/services/KKEP";

class App extends React.Component {

    state = {
        group: 0,
        group_name: undefined,
        error: false,
        colorScheme: 'bright_light'
    }

    async componentDidMount() {

        const VKConnectCallback = async (e) => {

            if (e.detail.type === 'VKWebAppUpdateConfig') {
                bridge.unsubscribe(VKConnectCallback);

                const colorScheme = e.detail.data.scheme
                const user = await bridge.send('VKWebAppGetUserInfo')
                const groupList = await getGroupByVKId(user.id)

                if (groupList === null || groupList.length > 5)
                    this.setState({group: -1, error: true})

                else
                    if (groupList.length < 5)
                        this.setState({
                            group: parseInt(groupList[0].group_num),
                            group_name: groupList[0].name,
                            colorScheme: colorScheme
                        })
                    else
                        this.setState({group: -1, error: true})


                document.getElementById("body").setAttribute("scheme", colorScheme)

            }
        };

        bridge.subscribe(VKConnectCallback);
        await bridge.send('VKWebAppInit', {})

        // const groupList = await getGroupByVKId(1)
        // console.log(groupList)
        // if (groupList.length < 5)
        //     this.setState({
        //         group: parseInt(groupList[0].group_num),
        //         group_name: groupList[0].name,
        //         colorScheme: 'bright_light'
        //     })
        // else
        //     this.setState({group: -1, error: true})

    }

    render() {

        console.log(this.state)

        return (
            <ConfigProvider isWebView={true} colorScheme={this.state.colorScheme}>

                {this.state.group === 0 && <ScreenSpinner />}

                {this.state.group < 0 &&  <Panel id='check'>
                    <PanelHeader>ККЭП</PanelHeader>
                    <ErrorPage/>
                </Panel>}

                {this.state.group > 0 &&  <Panel id="app">
                    <PanelHeader>Расписание</PanelHeader>
                    <RaspTable appState={this.state}/>
                </Panel>}

            </ConfigProvider>
        );
    }
}

export default App;
