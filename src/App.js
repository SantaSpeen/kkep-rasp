import React from 'react';

import bridge from '@vkontakte/vk-bridge';
import {Button, ConfigProvider, Panel, PanelHeader} from "@vkontakte/vkui";

import RaspTable from "./js/panel/Table";

class App extends React.Component {

    state = {
        load: false,
        colorScheme: 'bright_light'
    }

    async componentDidMount() {

        const VKConnectCallback = (e) => {
            if (e.detail.type === 'VKWebAppUpdateConfig') {
                bridge.unsubscribe(VKConnectCallback);

                const colorScheme = e.detail.data.scheme
                this.setState({load: true, colorScheme: colorScheme})

                document.getElementById("body").setAttribute("scheme", colorScheme)

            }
        };

        bridge.subscribe(VKConnectCallback);
        await bridge.send('VKWebAppInit', {})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeView, activeStory, activePanel, scrollPosition} = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }

    logState(){
        console.log(this.state)
    }

    render() {

        return (this.state.load &&
            <ConfigProvider isWebView={true} colorScheme={this.state.colorScheme}>
                <Panel id="id">
                    <PanelHeader>Расписание</PanelHeader>
                    <RaspTable colorScheme={this.state.colorScheme}/>
                </Panel>
            </ConfigProvider>
        );
    }
}

export default App;
