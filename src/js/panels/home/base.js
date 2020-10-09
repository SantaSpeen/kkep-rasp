import React from 'react';

import {Panel, PanelHeader} from "@vkontakte/vkui"

import RaspTable from './Table'

class HomePanelBase extends React.Component {

    state = {
        rasp: null
    }


    render() {

        return(
            <Panel id="id">
                <PanelHeader>Расписание</PanelHeader>
                <RaspTable/>
            </Panel>
        );
    }
}



export default HomePanelBase;
