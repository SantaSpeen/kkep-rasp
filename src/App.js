import React from 'react';
import {connect} from 'react-redux';

import * as VK from './js/services/VK';

import {ConfigProvider} from "@vkontakte/vkui";

import HomePanelBase from './js/panels/home/base';

class App extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(VK.initApp());

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

    render() {
        const {colorScheme} = this.props;

        return (
            <ConfigProvider isWebView={true} colorScheme={colorScheme}>
                <HomePanelBase id="base"/>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        colorScheme: state.vkui.colorScheme
    };
};



export default connect(mapStateToProps)(App);
