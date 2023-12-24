function splitStringToArray(string) {
    return string.split(/(\r\n|\r|\n)/g);
}

function formatArrayToMatrix(array) {
    return array
        .filter((row) => row.trim().length !== 0)
        .map((row) => row.split(",").map((cell) => cell.trim()));
}

function sanitazeArray(array) {
    return array.map((row) => {
        return row.map((cell) => cell.trim())
    })
}

export {
    splitStringToArray,
    formatArrayToMatrix,
    sanitazeArray
}