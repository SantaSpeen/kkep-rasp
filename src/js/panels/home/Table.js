import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table
} from '@material-ui/core';

import {Button, Div, PanelSpinner} from "@vkontakte/vkui";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import {getRasp} from "../../services/KKEP";

const useStyles = makeStyles({
    table: {
        maxWidth: 250,
        minWidth: 250,
    },
});


class RaspTable extends React.Component {

    state = {
        loaded: false,
        spinner: true,
        rasp: null,
        error: null
    }

    getRasp(){
        this.setState({loaded: false, spinner: true, error: null})
        getRasp()
            .then(async (res) => this.setState({loaded: true, spinner: false, rasp: await res.json()}) )
            .catch((err) => this.setState({loaded: false, spinner: false, error: err}) )
    }

    async componentDidMount() {
        this.getRasp()
    }

    render() {
        const classes = useStyles;

        return (
            <Group>
                <TableContainer component={Paper}>

                    {this.state.error !== null && <div id='error'>
                        <h3 style={{color: 'red'}} align="center">Расписание не удалось получить</h3>
                        <p align="center"><small>{this.state.error.toString()}</small></p>
                        <Div><Button mode="secondary" size="l" stretched={true} onClick={() => this.getRasp()}>Обновить</Button></Div>
                    </div>}

                    {this.state.spinner && <PanelSpinner/>}

                    {this.state.loaded && <div id="loaded">
                        <h2 style={{color: 'cyan'}} align="center">Группа: {this.state.rasp[0].group} Неделя: {this.state.rasp[0].week}</h2>
                            {this.state.rasp.map((row) => (<div id='table'>
                                <h3 align='center'>{row.day_name}</h3>
                                <Table className={classes.table} padding="default" key={row.day_name}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">№</TableCell>
                                            <TableCell align="center">Преподаватель</TableCell>
                                            <TableCell align="center">Дисциплина</TableCell>
                                            <TableCell align="center">Ауд.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.pairs.map((row) => ( row.isnull === "0" &&
                                            <TableRow key={row.p_num}>
                                                <TableCell align="left">{row.p_num}</TableCell>
                                                <TableCell align="center">{row.p_prep}</TableCell>
                                                <TableCell align="center">{row.p_subj.replace("Ин. язык/Ин. язык", "Ин. язык")}</TableCell>
                                                <TableCell align="center">{row.p_aud}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>))}
                    </div>}

                </TableContainer>
            </Group>);
    }

}

export default RaspTable;
