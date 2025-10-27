import instance from '@/http/index.js'

export const getUserInfo = id => {
    return instance({
        url: '/user/getUserInfo',
        method: 'POST',
        data: {
            id
        }
    })
}

export const bind = (account, onlyId, url) => {
    return instance({
        url: '/user/bindAccount',
        method: 'POST',
        data: {
            account,
            onlyId,
            url
        }
    })
}

export const changePassword = (id, oldPassword, newPassword) => {
    return instance({
        url: '/user/changePassword',
        method: 'POST',
        data: {
            id,
            oldPassword,
            newPassword
        }
    })
}

export const changeName = (id, name) => {
    return instance({
        url: '/user/changeName',
        method: 'POST',
        data: {
            id,
            name,
        }
    })
}

export const changeSex = (id, sex) => {
    return instance({
        url: '/user/changeSex',
        method: 'POST',
        data: {
            id,
            sex
        }
    })
}

export const changeEmail = (id, email) => {
    return instance({
        url: '/user/changeEmail',
        method: 'POST',
        data: {
            id,
            email
        }
    })
}

// ----------------------------------------用户管理
export const createAdmin = data => {
    const {
        account,
        ...identity
    } = data
    return instance({
        url: '/user/createAdmin',
        method: 'POST',
        data: {
            account,
            ...identity
        }
    })
}

export const getAdminList = identity => {
    return instance({
        url: '/user/getAdminList',
        method: 'POST',
        data: {
            identity
        }
    })
}

export const editAdmin = data => {
    const {
        id,
        ...department
    } = data
    return instance({
        url: '/user/editAdmin',
        method: 'POST',
        data: {
            id,
            ...department
        }
    })
}

export const searchUser = (account, identity) => {
    return instance({
        url: '/user/searchUser',
        method: 'POST',
        data: {
            account,
            identity
        }
    })
}

export const searchUserByDepartment = department => {
    return instance({
        url: '/user/searchUserByDepartment',
        method: 'POST',
        data: {
            department
        }
    })
}

export const changeIdentityToUser = id => {
    return instance({
        url: '/user/changeIdentityToUser',
        method: 'POST',
        data: {
            id
        }
    })
}

export const changeIdentityToAdmin = (id, identity) => {
    return instance({
        url: '/user/changeIdentityToAdmin',
        method: 'POST',
        data: {
            id,
            identity
        }
    })
}

export const banUser = id => {
    return instance({
        url: '/user/banUser',
        method: 'POST',
        data: {
            id
        }
    })
}

// 解冻用户
export const hotUser = id => {
    return instance({
        url: '/user/hotUser',
        method: 'POST',
        data: {
            id
        }
    })
}

export const getBanList = () => {
    return instance({
        url: '/user/getBanList',
        method: 'POST',
    })
}

export const deleteUser = (id, account) => {
    return instance({
        url: '/user/deleteUser',
        method: 'POST',
        data: {
            id,
            account
        }
    })
}

// 获取对应身份的一个总人数
export const getAdminListLength = identity => {
    return instance({
        url: '/user/getAdminListLength',
        method: 'POST',
        data: {
            identity
        }
    })
}

// 监听换页返回数据
export const returnListData = (pager, identity) => {
    return instance({
        url: '/user/returnListData',
        method: 'POST',
        data: {
            pager,
            identity
        }
    })
}