const TOKEN = "2450cda654b43f77aecad6a5950d672e"

export const getGroupByVKId = async (id) =>{
    const res = await fetch(`https://test.my.kkep.ru/api.php?method=get_group_by_vk&vk_id=` + id + `&token=` + TOKEN)
    return await res.json()
}

export const getRasp = async (group, week, isRaw) => {
    if (week !== '')
        week = '&week='+week
    return fetch(`https://test.my.kkep.ru/api.php?method=get_stud_rasp&group=` + group + `&israw=` + isRaw + `&token=` + TOKEN + week)
}
