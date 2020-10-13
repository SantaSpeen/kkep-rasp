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
import Select from "@vkontakte/vkui/dist/components/Select/Select";

const useStyles = makeStyles({
    table: {
        maxWidth: 250,
        minWidth: 250,
    },
});


class RaspTable extends React.Component {

    state = {
        group: null,
        week: null,

        loaded: false,
        spinner: true,

        rasp: null,
        error: null
    }

    getRasp(){
        this.setState({loaded: false, spinner: true, error: null})
        console.log(this.state.group)
        console.log(this.state.week)
        getRaspByGroup(this.state.group, this.state.week)
            .then(async (res) => this.setState({group: this.state.group, loaded: true, spinner: false, rasp: await res.json()}) )
            .catch((err) => this.setState({spinner: false, error: err}) )
    }

    getColor(){
        const black = {backgroundColor: "#0a0a0a", color: "white"}
        if (this.props.appState.colorScheme === "space_gray")
            return black
    }

    getGroupSelectors(){
        return(
            <Group>
                <Select id="group_select"
                        top="Выбор группы" placeholder="Группа" defaultValue={this.props.appState.group}
                        onChange={() => this.setState({group: document.getElementById('group_select').value})}>
                    <option value="645">645-КД9-3ЭБУ</option>
                    <option value="644">644-КД9-3РАС</option>
                    <option value="643">643-КД9-3ИНБ</option>
                    <option value="642">642-КД9-3ИСП</option>
                    <option value="641">641-КД9-3ИНС</option>
                    <option value="640">640-КД9-3ССА</option>
                    <option value="639">639-КД9-3ССА</option>
                    <option value="638">638-КД9-3КСК</option>
                    <option value="637">637-КД9-3КСК</option>
                    <option value="636">636-Д9-3ЭБУ</option>
                    <option value="635">635-Д9-3РРТ</option>
                    <option value="634">634-Д9-3РАС</option>
                    <option value="633">633-Д9-3ИНБ</option>
                    <option value="632">632-Д9-3ИСП</option>
                    <option value="631">631-Д9-3ИНС</option>
                    <option value="630">630-Д9-3ССА</option>
                    <option value="629">629-Д9-3КСК</option>
                    <option value="622">622-КД9-3ЭБУ</option>
                    <option value="621">621-КД9-4ПИН</option>
                    <option value="620">620-КД9-4ИНБ</option>
                    <option value="619">619-КД9-4ИНС</option>
                    <option value="618">618-КД9-4РАС</option>
                    <option value="617">617-КД9-4КС</option>
                    <option value="616">616-КД9-4КСК</option>
                    <option value="615">615-КД9-4КС</option>
                    <option value="614">614-КД9-4КСК</option>
                    <option value="613">613-Д9-3ЭБУ</option>
                    <option value="612">612-Д9-4ПИН</option>
                    <option value="611">611-Д9-4ИНБ</option>
                    <option value="610">610-Д9-4ИНС</option>
                    <option value="609">609-Д9-4РРТ</option>
                    <option value="608">608-Д9-4РАС</option>
                    <option value="607">607-Д9-4КС</option>
                    <option value="606">606-Д9-4КСК</option>
                    <option value="599">599-КД9-3ЭБУ</option>
                    <option value="591">591-Д9-3ЭБУ</option>
                    <option value="36">36-КД9-1ССА</option>
                    <option value="35">35-КД9-1КСК</option>
                    <option value="34">34-КД9-1ЭБУ</option>
                    <option value="33">33-КД9-1РРТ</option>
                    <option value="32">32-КД9-1РАС</option>
                    <option value="31">31-КД9-1ИНБ</option>
                    <option value="30">30-КД9-1ИСП</option>
                    <option value="29">29-КД9-1ИНС</option>
                    <option value="28">28-КД9-1ССА</option>
                    <option value="27">27-КД9-1КСК</option>
                    <option value="26">26-Д9-1ЭБУ</option>
                    <option value="25">25-Д9-1РАС</option>
                    <option value="24">24-Д9-1ИНБ</option>
                    <option value="23">23-Д9-1ИСП</option>
                    <option value="22">22-Д9-1ИНС</option>
                    <option value="21">21-Д9-1ССА</option>
                    <option value="20">20-Д9-1КСК</option>
                    <option value="15">15-КД9-2ЭБУ</option>
                    <option value="14">14-КД9-2РАС</option>
                    <option value="13">13-КД9-2ИНБ</option>
                    <option value="12">12-КД9-2ИСП</option>
                    <option value="11">11-КД9-2ИНС</option>
                    <option value="10">10-КД9-2ССА</option>
                    <option value="9">9-КД9-2КСК</option>
                    <option value="8">8-Д9-2ЭБУ</option>
                    <option value="7">7-Д9-2РРТ</option>
                    <option value="6">6-Д9-2РАС</option>
                    <option value="5">5-Д9-2ИНБ</option>
                    <option value="4">4-Д9-2ИСП</option>
                    <option value="3">3-Д9-2ИНС</option>
                    <option value="2">2-Д9-2ССА</option>
                    <option value="1">1-Д9-2КСК</option>
                </Select>
                <Select id="week_select"
                        top="Выбор недели" placeholder='Неделя' defaultValue={this.state.rasp[0].week}
                        onChange={() => this.setState({week: document.getElementById('week_select').value})}>
                    <option value="1">Первая</option>
                    <option value="2">Вторая</option>
                </Select>
            </Group>
        )
    }

    componentDidMount() {
        this.setState({error: "error"})
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
                        {this.getGroupSelectors()}
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
