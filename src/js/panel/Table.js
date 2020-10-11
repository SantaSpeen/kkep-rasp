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
import {getRaspByGroup} from "../services/KKEP";

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
        getRaspByGroup(this.props.appState.group)
            .then(async (res) => this.setState({loaded: true, spinner: false, rasp: await res.json()}) )
            .catch((err) => this.setState({loaded: false, spinner: false, error: err}) )
    }

    getColor(){
        const black = {backgroundColor: "#0a0a0a", color: "white"}
        if (this.props.appState.colorScheme === "space_gray")
            return black
    }

    async componentDidMount() {
        this.getRasp()
    }

    render() {
        const classes = useStyles;

        return (
            <Group>
                <TableContainer component={Paper} style={this.getColor()}>

                    {this.state.error !== null && <div id='error'>
                        <h3 style={{color: 'red'}} align="center">Расписание не удалось получить</h3>
                        <p align="center"><small>{this.state.error.toString()}</small></p>
                        <Div><Button mode="secondary" size="l" stretched={true} onClick={() => this.getRasp()}>Обновить</Button></Div>
                    </div>}

                    {this.state.spinner && <PanelSpinner/>}

                    {this.state.loaded && <div id="loaded">
                        <h2 style={{color: 'cyan'}} align="center">Группа: {this.props.appState.group_name} Неделя: {this.state.rasp[0].week}</h2>
                            {this.state.rasp.map((row) => (<div key={row.day_name}>
                                <h3 align='center'>{row.day_name}</h3>
                                <Table className={classes.table} key={row.day_name}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" style={this.getColor()}>№</TableCell>
                                            <TableCell align="center" style={this.getColor()}>Преподаватель</TableCell>
                                            <TableCell align="center" style={this.getColor()}>Дисциплина</TableCell>
                                            <TableCell align="center" style={this.getColor()}>Ауд.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.pairs.map((row) => ( row.isnull === "0" &&
                                            <TableRow key={row.p_num}>
                                                <TableCell align="left" style={this.getColor()}>{row.p_num}</TableCell>
                                                <TableCell align="center" style={this.getColor()}>{row.p_prep}</TableCell>
                                                <TableCell align="center" style={this.getColor()}>{row.p_subj.replace("Ин. язык/Ин. язык", "Ин. язык")}</TableCell>
                                                <TableCell align="center" style={this.getColor()}>{row.p_aud}</TableCell>
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
