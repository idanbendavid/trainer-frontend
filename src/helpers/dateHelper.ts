export function dateHelper(mutableDate: Date) {

    let date = mutableDate.getDate();
    let month = mutableDate.getMonth() + 1;
    let year = mutableDate.getFullYear();

    let fixedDate: string;

    if (month < 10) {
        let fixedMonth = `0${month}`
        fixedDate = year + "-" + fixedMonth + "-" + date;

        return fixedDate
    }
    else {
        fixedDate = year + "-" + month + "-" + date;
        return fixedDate
    }
}