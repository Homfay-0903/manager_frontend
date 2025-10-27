import {
    defineStore
} from 'pinia'
import {
    getUserInfo
} from '@/api/userinfo'

export const useUserInfoStore = defineStore('userinfo', {
    state: () => {
        return {
            imageUrl: '',
            name: '',
            sex: '',
            department: '',
            identity: '',
            account: '',
            email: '',
        }
    },
    actions: {
        async fetchUserInfo(id) {
            const res = await getUserInfo(id)
            console.log(res)
            this.imageUrl = res.data.image_url
            this.name = res.data.name
            this.sex = res.data.sex
            this.department = res.data.department
            this.identity = res.data.identity
            this.account = res.data.account
            this.email = res.data.email
        }
    },
    persist: true
})