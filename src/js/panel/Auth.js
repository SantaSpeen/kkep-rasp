import React from 'react';
import {Group} from "@vkontakte/vkui";

import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@material-ui/core/Input";

class More extends React.Component {

    render() {
        return (
            <Group>
                <FormLayout>

                    <Input top="Логин" />
                    <Input top="Пароль" />

                </FormLayout>
            </Group>
        )
    }

}

export default More;