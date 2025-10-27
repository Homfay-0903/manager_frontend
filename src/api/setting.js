import instance from '@/http/index.js'

export const getAllSwiper = () => {
    return instance({
        url: '/set/getAllSwiper',
        method: 'POST',
    })
}

export const getCompanyName = () => {
    return instance({
        url: '/set/getCompanyName',
        method: 'POST',
    })
}

export const changeCompanyName = (set_value) => {
    return instance({
        url: '/set/changeCompanyName',
        method: 'POST',
        data: {
            set_value
        }
    })
}

export const changeCompanyIntroduce = (set_text, set_name) => {
    return instance({
        url: '/set/changeCompanyIntroduce',
        method: 'POST',
        data: {
            set_text,
            set_name
        }
    })
}

export const getCompanyIntroduce = (set_name) => {
    return instance({
        url: '/set/getCompanyIntroduce',
        method: 'POST',
        data: {
            set_name
        }
    })
}

export const getAllCompanyIntroduce = () => {
    return instance({
        url: '/set/getAllCompanyIntroduce',
        method: 'POST',

    })
}

// 部门设置
export const setDepartment = data => {
    return instance({
        url: '/set/setDepartment',
        method: 'POST',
        data: {
            set_value: data
        }
    })
}

// 获取部门
export const getDepartment = () => {
    return instance({
        url: '/set/getDepartment',
        method: 'POST',
    })
}

export const setProduct = data => {
    return instance({
		url: '/set/setProduct',
		method: 'POST',
		data: {
			set_value: data
		}
	})
}

// 获取产品
export const getProduct = () => {
	return instance({
		url: '/set/getProduct',
		method: 'POST',
	})
}