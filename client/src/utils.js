export const filterEmpty = (data, allowEmptyKeys) => {
    if (data) {
        if (data instanceof Array) {
            return data
        }
        const rst = {}
        Object.keys(data).forEach(key => {
            const value = data[key]
            if (allowEmptyKeys && allowEmptyKeys.includes(key)) {
                rst[key] = value
            } else {
                (value || value === 0 || typeof value === 'boolean') && (rst[key] = value)
            }
        })
        return rst
    }
}