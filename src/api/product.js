import instance from '@/http/index.js'

export const createProduct = data => {
    const {
        product_id,
		...in_memo
    } = data
    return instance({
        url: '/product/createProduct',
		method: 'POST',
		data: {
			product_id,
			...in_memo
		}
    })
}

export const deleteProduct = id => {
    return instance({
        url: '/product/deleteProduct',
		method: 'POST',
		data: {
			id
		}
    })
}

export const editProduct = data => {
    const {
		id,
		...product_name
	} = data
    return instance({
        url: '/product/editProduct',
		method: 'POST',
		data: {
			id,
			...product_name
		}
    })
}

// 获取产品列表 getProductList
export const getProductList = () => {
	return instance({
		url: '/product/getProductList',
		method: 'POST',
	})
}

// 产品申请出库
export const applyOutProduct = data => {
	const {
		id,
		...apply_memo
	} = data
	return instance({
		url: '/product/applyOutProduct',
		method: 'POST',
		data: {
			id,
			...apply_memo
		}
	})
}

// 产品审核列表
export const applyProductList = () => {
	return instance({
		url: '/product/applyProductList',
		method: 'POST',
	})
}

// 对产品进行撤回申请
export const withdrawApplyProduct = id => {
	return instance({
		url: '/product/withdrawApplyProduct',
		method: 'POST',
		data: {
			id
		}
	})
}

// 产品审核
export const auditProduct = data => {
	const {
		id,
		...product_out_number
	} = data
	return instance({
		url: '/product/auditProduct',
		method: 'POST',
		data: {
			id,
			...product_out_number
		}
	})
}

// 通过入库编号对产品进行搜索 searchProductForId
export const searchProductForId = product_id => {
	return instance({
		url: '/product/searchProductForId',
		method: 'POST',
		data: {
			product_id
		}
	})
}

// 通过出库申请编号对产品进行搜索
export const searchProductForApplyId = product_out_id => {
	return instance({
		url: '/product/searchProductForApplyId',
		method: 'POST',
		data: {
			product_out_id
		}
	})
}

// 通过出库编号对产品进行搜索
export const searchProductForOutId = product_out_id => {
	return instance({
		url: '/product/searchProductForOutId',
		method: 'POST',
		data: {
			product_out_id
		}
	})
}

// 获取产品总数
export const getProductLength = () => {
	return instance({
		url: '/product/getProductLength',
		method: 'POST',
	})
}

// 获取申请出库产品总数
export const getApplyProductLength = () => {
	return instance({
		url: '/product/getApplyProductLength',
		method: 'POST',
	})
}

// 获取出库产品列表
export const auditProductList = () => {
	return instance({
		url: '/product/auditProductList',
		method: 'POST',
	})
}


// 获取出库产品总数
export const getOutProductLength = () => {
	return instance({
		url: '/product/getOutProductLength',
		method: 'POST',
	})
}

// 监听换页返回数据  产品页面
export const returnProductListData = pager => {
	return instance({
		url: '/product/returnProductListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

// 监听换页返回数据  申请出库页面
export const returnApplyProductListData = pager => {
	return instance({
		url: '/product/returnApplyProductListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

// 监听换页返回数据  出库页面
export const returnOutProductListData = pager => {
	return instance({
		url: '/product/returnOutProductListData',
		method: 'POST',
		data: {
			pager
		}
	})
}