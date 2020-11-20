module.exports = (queryResult, response) => {
    let quotaSplits = []
    for (let takeQuota of queryResult) {
        //phân tách dữ liệu bằng cách split theo " . "
        let splited = takeQuota.quotaname.split(".")
        //map dữ liệu trong survey bằng cách filter dữ liệu từ text tương ứng với rowList và colList, trả về json thỏa điều kiện
        //sau đó trích lọc dữ liệu chỉ lấy uniqueID
        //lấy vị trị [0] do filter trả về array
        quotaSplits.push([
            response.rowList.filter(x => x.text == splited[0]).map(x => x = x.uniqueID)[0],
            response.colList.filter(x => x.text == splited[1]).map(x => x = x.uniqueID)[0]
        ])
    }
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
