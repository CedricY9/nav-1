/*
 * @Author: Cedric
 * @Date: 2022-11-03 09:57:52
 * @LastEditTime: 2022-11-07 09:09:22
 * @Description: 
 */
const $siteList = $('.siteList')//找到类名siteList的标签
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)//把字符串变成对象
const hashMap = xObject || [
    { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
    { logo: 'B', logoType: 'text', url: 'https://www.bilibili.com/' }
];

const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')//删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>

                        <div class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                            <div class="close">
                                <svg class="icon">
                                    <use xlink:href="#icon-close"></use>
                                </svg>
                            </div>
                        </div>

        </li>`).insertBefore($lastLi)
        $li.on('click', () => {//代替a标签，打开新窗口
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('添加网址：')//url变量可以得到用户输入的东西
    if (url.indexOf('http//') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render()
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)//可以把一个对象变成一个字符串
    localStorage.setItem('x', string)//意思是在本地存储里面设置x，值为string
}

$(document).on('keypress', (e) => {
    const { key } = e //key=e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})