module.exports = (response) => {
    return response.data.map(x => {
        //dùng Array function find() dể tìm giá trị phù hợp với uniqueID trong response data
        //sau đó trích dữ liệu trong prop text để tạo dataName
        let dataName = response.rowList.find(element => x.row === element.uniqueID).text + "."
                    + response.colList.find(element => x.row === element.uniqueID).text 
        return {
            dataName: dataName,
            maxQuota: x.maxQuota,
            current: x.current
        }
    })
}