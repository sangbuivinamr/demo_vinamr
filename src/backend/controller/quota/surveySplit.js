module.exports = (queryResult, response) => {
    let quotaSplits = []
    console.log(`begin testing`)
    //lấy dữ liệu quotaname sau đó chia dữ liệu thanh row thành col qua dấu " . "
    for (let takeQuota of queryResult) {
        let splited = takeQuota.quotaname.split(".")
        //Đối chiếu với dữ liệu text trong quota editing để chuyển thành uniqueID vì data chứa uniqueID, ko phải text 
        // for (let i = 0; i < response.rowList.length; i++) {
        //     if (response.rowList[i].text == splited[0]) {
        //         splited[0] = response.rowList[i].uniqueID
        //     }
        // }
        quotaSplits.push([
            response.rowList.filter(x => x.text == splited[0]).map(x => x = x.uniqueID)[0],
            response.colList.filter(x => x.text == splited[1]).map(x => x = x.uniqueID)[0]
        ])
        //     for (let i = 0; i < response.colList.length; i++) {
        //         if (response.colList[i].text == splited[1]) {
        //             splited[1] = response.colList[i].uniqueID
        //         }
        //     }
        //     quotaSplits.push(splited)
        // }
        // return quotaSplits
    }
    console.log(quotaSplits)
    //Khởi tạo dữ liệu current trước khi đếm survey và phân loại
    for (let dataRow of response.data) {
        dataRow.current = 0
    }
    //đối chiếu với với uniqueID trong response data để phân loại các dữ liệu
    for (let eachSurvey of quotaSplits) {
        //nếu cả 2 uniqueID ở row và column đều matching, current cộng thêm 1 đơn vị
        for (let dataRow of response.data) {
            if (eachSurvey[0] == dataRow.row && eachSurvey[1] == dataRow.column) {
                dataRow.current++
            }
        }
    }
    return response
}