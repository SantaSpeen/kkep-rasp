import bridge from '@vkontakte/vk-bridge';
const TOKEN = "2450cda654b43f77aecad6a5950d672e"

export const getGroupByVKId = (id) =>{
    let data;
    fetch(`https://test.my.kkep.ru/api.php?method=get_user&vk_id=` + id)
        .then(async (res) => {data = await res.json()})
        .catch((error) => {data = error.toString()})
    console.log(data)
    if (data!== undefined){
        return data
    }
    return 36
}

export const getRasp = async () => {
    const user = await bridge.send('VKWebAppGetUserInfo')
    const group = getGroupByVKId(user.id)
    return fetch(`https://test.my.kkep.ru/api.php?method=get_stud_rasp&group=` + group + `&token=` + TOKEN)
}
