import instance from '@/http/index.js'

export const register = data => {
    const {
        account,
        password
    } = data
    const form = new URLSearchParams()
    if (account !== undefined && account !== null) form.append('account', String(account))
    if (password !== undefined && password !== null) form.append('password', String(password))
    return instance({
        url: '/api/register',
        method: 'POST',
        data: form
    })
}

export const login = data => {
    const {
        account,
        password
    } = data
    const form = new URLSearchParams()
    if (account !== undefined && account !== null) form.append('account', String(account))
    if (password !== undefined && password !== null) form.append('password', String(password))
    return instance({
        url: '/api/login',
        method: 'POST',
        data: form
    })
}

export const returnMenuList = (id) =>{
  return instance({
    url: '/api/returnMenuList',
    method: 'POST',
    data: {
      id
    }
  })
}

export const verify = data => {
    const {
        account,
        email
    } = data
    return instance({
        url: '/user/verifyAccountAndEmail',
        method: 'POST',
        data: {
            account,
            email
        }
    })
}

export const reset = (id, newPassword) => {
    return instance({
        url: '/user/changePasswordInLogin',
        method: 'POST',
        data: {
            id,
            newPassword
        }
    })
}