export default {
    state: {
        isCollapse: false, // 控制菜单的展开还是收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: [],
        routes: []
    },
    mutations: {
        // 修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val;
                const result = state.tabsList.findIndex(item => item.name === val.name);
                console.log("selectMenu");
                if (result === -1) {
                    console.log("push into tabsList");
                    state.tabsList.push(val);
                }
            } else {
                state.currentMenu = null;
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1);
        },
        setMenu(state, val) {
            console.log(val, 'setMenu')
            state.menu = val;
            window.sessionStorage.setItem('menu', JSON.stringify(val));

        },
        getMenu(state) {
            state.menu = JSON.parse(window.sessionStorage.getItem('menu'))
        },
        clearMenuAndRoutes(state) {
            state.menu = []
            state.routes = []
            window.sessionStorage.removeItem('menu')
        },
        addRoutesByMenu(state, router) {
            if (!window.sessionStorage.getItem('menu')) {
                console.log('noMenu, return')
                return
            }
            const menu = JSON.parse(window.sessionStorage.getItem('menu'))
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(childrenItem => {
                        childrenItem.component = () => import(`../views/${childrenItem.url}`)
                        //  拼接字符串
                        return childrenItem
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });

            //在 Main 下添加子路由
            menuArray.forEach(item => {
                console.log(router, 'addRoutes.router')
                router.addRoute('Main', item)
            })

            state.routes = menuArray;
        },
        // setRoutes(state, router) {
        //     const routesArray = state.routes

        //     //在 Main 下添加子路由
        //     routesArray.forEach(item => {
        //         console.log(router, 'setRoutes.router')
        //         router.addRoute('Main', item)
        //     })
        // }
    }
}