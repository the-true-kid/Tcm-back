function validateColumns(columns, allowedColumns) {
    return columns.every((col) => allowedColumns.includes(col));
  }
  
  module.exports = validateColumns;
  