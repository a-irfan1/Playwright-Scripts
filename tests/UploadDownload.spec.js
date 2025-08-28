const {test, expect} = require('@playwright/test');
const excelJS = require('exceljs');

async function demo(searchFor, replaceWith, offset, filepath){
    
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filepath);
    const workSheet = workbook.getWorksheet("Sheet1");
    const cellAt = await readCells(workSheet, searchFor);    

    const cell = workSheet.getCell(cellAt.row + offset.rowOffset, cellAt.column + offset.colOffset);
    cell.value = replaceWith;
    await workbook.xlsx.writeFile(filepath);
}

async function readCells(workSheet, searchFor){
    const cellAt = {row: -1, column: -1};
    workSheet.eachRow((row, rownumber) => {
        row.eachCell((cell, column) => {
            if (cell.value === searchFor){
                cellAt.row = rownumber;
                cellAt.column = column;
            }
        })
    });
    return cellAt;
}

test('Excel file upload download', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadButton = page.getByRole('button',{name: 'Download'});
    const downloadPromise = await Promise.all([page.waitForEvent("download"),await downloadButton.click()]);
    // await page.getByRole('button',{name: 'Download'}).click();
    await downloadPromise;
    const filepath = await downloadPromise[0].path();

    demo("Mango", 350, {rowOffset: 0, colOffset: 2}, filepath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filepath);

    const findText = page.getByText("Mango");
    const desiredRow = page.getByRole("row").filter({has: findText});
    
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText('350');
});

