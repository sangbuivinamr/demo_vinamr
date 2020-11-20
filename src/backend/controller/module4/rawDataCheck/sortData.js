module.exports = (result) => {
    //sắp xếp lại các survey theo từng loại.
    result = result.sort((a, b) => { return a.interviewid - b.interviewid })
    let myMap = new Map()
    //dung map để lấy ra những survey mới nhất của từng interviewid
    for (let i = 0; i < result.length; i++) {
        //Nếu trong map chưa có interviewid đó, map tạo một phần tử mới với key là interviewid và value là gói dữ liệu đó
        if (!myMap.has(result[i].interviewid)) {
            myMap.set(result[i].interviewid, result[i])
        } else {
            //nếu dữ liệu đã có trong map ta kiểm tra điều kiện
            let existedKey = myMap.get(result[i].interviewid)
            let comparedStt = existedKey.stt
            //interview nào mới hơn sẽ có stt mới hơn
            if (result[i].stt > comparedStt) {
                //xóa value cũ trong phần tử có key đó và add interview mới vào
                myMap.delete(result[i].interviewid)
                myMap.set(result[i].interviewid, result[i])
            }
        }
    }
    // add từng phần tử value trong map vào và return
    let response = []
    for (let value of myMap.values()) {
        response.push(value)
    }
    return response
}