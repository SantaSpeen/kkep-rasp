import React from 'react';
import {Div, Group, Link} from "@vkontakte/vkui";

class ErrorPage extends React.Component {

    render() {
        return (
            <div>
               <Group>
                   <Div>
                       <h2 align="center" style={{color: "red"}}>Ошибка авторизации.</h2>
                   </Div>
               </Group>
                <Group>
                    <Div>
                        <p align="center">Если у вас нет ёще аккаунта в нашем колледже: <Link href="https://my.kkep.ru/">зарегистрируйтесь</Link>.</p>
                        <p align="center">Если вы считаете, что это ошибка <Link href='https://vk.me/l.vindeta'>напишите разработчику</Link>.</p>
                    </Div>
                </Group>
            </div>
        )
    }

}

export default ErrorPage;