/*
    Example:

    Chart has 3 columns (2 Dims, 1 Msr)

    date_num | dim | msr
    ---------|-----|-----
    43556    | B   | 17
    43556    | C   | 26
    ....

    > As you can see the data has been transposed.

*/

data = [ [ { qText: '43556', qNum: 43556, qElemNumber: 1, qState: 'O' },
    { qText: 'B', qNum: 'NaN', qElemNumber: 2, qState: 'O' },
    { qText: '17', qNum: 17, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43556', qNum: 43556, qElemNumber: 1, qState: 'O' },
    { qText: 'C', qNum: 'NaN', qElemNumber: 1, qState: 'O' },
    { qText: '26', qNum: 26, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43556', qNum: 43556, qElemNumber: 1, qState: 'O' },
    { qText: 'D', qNum: 'NaN', qElemNumber: 0, qState: 'O' },
    { qText: '38', qNum: 37.5, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43586', qNum: 43586, qElemNumber: 2, qState: 'O' },
    { qText: 'B', qNum: 'NaN', qElemNumber: 2, qState: 'O' },
    { qText: '23', qNum: 23, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43586', qNum: 43586, qElemNumber: 2, qState: 'O' },
    { qText: 'C', qNum: 'NaN', qElemNumber: 1, qState: 'O' },
    { qText: '36', qNum: 35.75, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43586', qNum: 43586, qElemNumber: 2, qState: 'O' },
    { qText: 'D', qNum: 'NaN', qElemNumber: 0, qState: 'O' },
    { qText: '29', qNum: 29, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43617', qNum: 43617, qElemNumber: 0, qState: 'O' },
    { qText: 'B', qNum: 'NaN', qElemNumber: 2, qState: 'O' },
    { qText: '18', qNum: 17.75, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43617', qNum: 43617, qElemNumber: 0, qState: 'O' },
    { qText: 'C', qNum: 'NaN', qElemNumber: 1, qState: 'O' },
    { qText: '21', qNum: 21, qElemNumber: 0, qState: 'L' } ],
  [ { qText: '43617', qNum: 43617, qElemNumber: 0, qState: 'O' },
    { qText: 'D', qNum: 'NaN', qElemNumber: 0, qState: 'O' },
    { qText: '17', qNum: 17.25, qElemNumber: 0, qState: 'L' } ] ]

const rows = []
const rowObj = {}

for (var r in data) {
   let row = data[r]
    values = []
    v = {}

    for (var c in row) {
        values.push(row[c].qNum== 'NaN' ? row[c].qText : row[c].qNum)
    }

    // Row Array
    rows.push(values)

    // Single Object with dim values as key
    key = values[0]+"|"+values[1]
    rowObj[key] = values[2]

}

console.log(rows)
console.log(rowObj)