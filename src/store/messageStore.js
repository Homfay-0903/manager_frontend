import {
	defineStore
} from 'pinia'
import {
	getReadListAndStatus,
	getDepartmentMsgList
} from '@/api/dep_msg.js'

export const useMsgStore = defineStore('messageinfo', {
	state: () => {
		return {
			read_list: [],
			msg_list:[]
		}
	},
	actions: {
		async returnReadList(id) {
			this.read_list = []
			this.msg_list = []
			const res = (await getReadListAndStatus(id)).data
			//console.log(res)
			this.read_list = JSON.parse(res[0].read_list)
			this.msg_list = (await getDepartmentMsgList(localStorage.getItem('department'))).data
		}
	},
	persist:true
})