class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {
    // Your code here

    try {
      const sudokuGrid = this.#createGrid(sudoku)
      const { isValid, gridSum } = this.#validateSudokuGrid(sudokuGrid)

      const completeSum = (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9) * 9
      const isCompleted = completeSum === gridSum ? true : false

      if (isValid && isCompleted) return 'Sudoku is valid.'
      if (isValid) return 'Sudoku is valid but incomplete.'
      return 'Sudoku is invalid.'

    } catch (error) {
      // not valid data, or grid not 9 x 9
      // return error
      return 'Sudoku is invalid.'
    }
  }

  #validateSudokuGrid = (grid) => {
    let gridSum = 0
    const rowSet = new Set()
    const colSet = new Set()
    const sectionSet = new Set()

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const currentRowArray = grid[rowIndex];

      for (let colIndex = 0; colIndex < currentRowArray.length; colIndex++) {
        const rowNumber = currentRowArray[colIndex];
        const colNumber = grid[colIndex][rowIndex];
        const sectionNumber = grid[Math.floor(colIndex / 3)][colIndex % 3];

        if (rowNumber !== 0) {
          if (rowNumber > 9) return { isValid: false, gridSum }
          if (rowSet.has(rowNumber)) return { isValid: false, gridSum }
          rowSet.add(rowNumber)
          gridSum += rowNumber
        }

        if (colNumber !== 0) {
          if (colNumber > 9) return { isValid: false, gridSum }
          if (colSet.has(colNumber)) return { isValid: false, gridSum }
          colSet.add(colNumber)
        }

        if (sectionNumber !== 0) {
          if (sectionNumber > 9) return { isValid: false, gridSum }
          if (sectionSet.has(sectionNumber)) return { isValid: false, gridSum }
          sectionSet.add(sectionNumber)
        }

      }

      rowSet.clear()
      colSet.clear()
      sectionSet.clear()
    }

    return { isValid: true, gridSum }
  }

  #createGrid = (string) => {
    const array = []
    const numberPattern = /\d+/g;
    const splitByLine = `${string}`.split("\n")

    splitByLine.forEach((line) => {
      const numbericsInLine = line.match(numberPattern)
      const numbersInLine = (numbericsInLine || []).map(numberic => Number(numberic))
      if (numbersInLine.length !== 0 && numbersInLine.length !== 9) throw ('Sudoku width is invalid.')
      if (numbersInLine.length === 9) array.push(numbersInLine)
    })

    if (array.length !== 9) throw ('Sudoku height is invalid.')
    return array
  }

}

module.exports = Validator
