import bridge from '@vkontakte/vk-bridge';
const TOKEN = "2450cda654b43f77aecad6a5950d672e"

export const getGroupByVKId = async (id) =>{
    const res = await fetch(`https://test.my.kkep.ru/api.php?method=get_group_by_vk&vk_id=` + id + `&token=` + TOKEN)
    return await res.json()
}

export const getRasp = async () => {
    const user = await bridge.send('VKWebAppGetUserInfo')
    const group = getGroupByVKId(user.id)
    return fetch(`https://test.my.kkep.ru/api.php?method=get_stud_rasp&group=` + group + `&token=` + TOKEN)
}

export const getRaspByGroup = async (group) => {
    return fetch(`https://test.my.kkep.ru/api.php?method=get_stud_rasp&group=` + group + `&token=` + TOKEN)
}
