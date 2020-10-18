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
import * as KKEP from "../services/KKEP";

import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Switch from "@vkontakte/vkui/dist/components/Switch/Switch";
import Caption from "@vkontakte/vkui/dist/components/Typography/Caption/Caption";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";

const useStyles = makeStyles({
    table: {
        maxWidth: 250,
        minWidth: 250,
    },
});


class RaspTable extends React.Component {

    state = {
        group: null,
        week: '',
        isRaw: 0,

        see: {
            rasp: false,
            spinner: true,
            settings: false
        },

        rasp: null,
        error: null,

        handleScroll: 0
    }

    getRasp() {
        this.setState({loaded: false, spinner: true, error: null, see: {settings: false}})

        if (this.state.group === null)
            // eslint-disable-next-line
            this.state.group = this.props.appState.group

        KKEP.getRasp(this.state.group, this.state.week, this.state.isRaw)
            .then(async (res) => this.setState({see: {rasp: true, spinner: false}, rasp: await res.json()}) )
            .catch((err) => this.setState({see: {spinner: false}, error: err}) )
    }

    getColor(isChanged = 0) {

        if (this.props.appState.colorScheme === "space_gray"){
            if (isChanged === 1)
                return {backgroundColor: "#354e53", color: "white"}
            return {backgroundColor: "#19191a", color: "white"}
        }

        if (isChanged === 1)
            return {backgroundColor: "#08cfbf", color: "white"}
    }

    getGroupSelectors() {
        return(
            <Group>
                <Div>
                    <Title level="2" weight="heavy" style={{ marginBottom: 16 }}>Настройки</Title>
                </Div>
                <Div>
                    <Select id="group_select"
                            top="Выбор группы" defaultValue={this.state.group}
                            onChange={e => {
                                // eslint-disable-next-line
                                this.state.group = e.target.value
                            }}
                    >
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
                </Div>
                <Div>
                    <Select
                        id="week_select"
                        top="Выбор недели" defaultValue={this.state.rasp[0].week}
                        onChange={e => {
                                // eslint-disable-next-line
                                this.state.week = e.target.value
                        }}
                    >
                        <option value="1">Первая</option>
                        <option value="2">Вторая</option>
                    </Select>
                </Div>

                <Div>
                    <Cell asideContent={
                        <Switch
                            id="isRaw"
                            defaultChecked={this.state.isRaw === 0}
                            onChange={e => {
                        // eslint-disable-next-line
                        this.state.isRaw = e.target.checked ? 0 : 1
                    }}/>}>Показать замены</Cell>
                </Div>

                <Div>
                    <Button onClick={() => this.getRasp()} size='l'>Применить</Button>
                </Div>

            </Group>
        )
    }

    componentDidMount() {
        this.getRasp()
    }

    fixSubj(subj: string) {
        return subj
            .replace('Ин.яз в проф.деятельности/Ин.яз в проф.деятельности', 'Ин.яз в проф.деятельности')
            .replace("Ин. язык/Ин. язык", "Ин. язык")
    }

    render() {

        const classes = useStyles;

        return (
            <Group id='rasp_table'>
                <TableContainer component={Paper} style={this.getColor()}>

                    {this.state.see.spinner && <PanelSpinner/>}

                    {this.state.error !== null &&
                    <div id='error'>
                        <h3 style={{color: 'red'}} align="center">Расписание не удалось получить</h3>
                        <p align="center"><small>{this.state.error.toString()}</small></p>
                        <Div><Button mode="secondary" size="l" stretched={true} onClick={() => this.getRasp()}>Обновить</Button></Div>
                    </div>
                    }

                    {this.state.see.rasp &&
                    <div id="loaded">
                        <Caption level="2" weight="regular" style={{ marginBottom: 16 }} align='center'>Группа: {this.state.group} Неделя: {this.state.rasp[0].week}</Caption>
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
                                            <TableCell align="left" style={this.getColor(row.ischange)}>{row.p_num}</TableCell>
                                            <TableCell align="center" style={this.getColor(row.ischange)}>{row.p_prep}</TableCell>
                                            <TableCell align="center" style={this.getColor(row.ischange)}>{this.fixSubj(row.p_subj)}</TableCell>
                                            <TableCell align="center" style={this.getColor(row.ischange)}>{row.p_aud}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>))}
                        <Div>
                            <Button size="m" mode="secondary" stretched={true} onClick={() => this.setState({see: {settings: true}})}>Настройки</Button>
                        </Div>
                    </div>
                    }

                    {this.state.see.settings &&
                    <div id="settings">
                        {this.getGroupSelectors()}
                    </div>}

                </TableContainer>
            </Group>);
    }

}

export default RaspTable;
