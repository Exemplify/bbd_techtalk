const tableID = "inbox";

const loadInbox = (filteredEmails) =>
{
    const table = document.getElementById(tableID);
    createTableRow(table, ['Subject', 'From', 'Body'], ['theading', 'theading', 'theading']);
    displayEmails(table, filteredEmails, emailFolders.inbox);
}

const updateEmailFolder = (filteredEmails, folder) => {
    const table = document.getElementById(tableID)
    clearInboxDisplay(table)
    displayEmails(table, filteredEmails, folder);
}


const displayEmails= (table, filteredEmails, folder)=>{
    const folderEmails = extractFolderEmails(filteredEmails, folder);
    folderEmails.forEach(email => {
        createTableRow(table, 
            [email.subject, email.from, email.body],
            ['', 'subject', '']);
    });
    
}

const createTableRow = ( table, cells, classes ) => {
    let row = table.insertRow();
    cells.forEach( (cell, index)=>{
        let tableCell = row.insertCell(index); 
        classes[index] !== '' && tableCell.classList.add(classes[index]);
        tableCell.innerHTML = cell;
    });
}

const extractFolderEmails =  (filteredEmails, folder) => {
    let result = [];
     filteredEmails.forEach( (email) => {
         email.folder === folder && result.push(email); 
    })
    return result;
}



const clearInboxDisplay = (table) => {
    const startingIdx = 1;
    let tbody = table.tBodies[0];
    while( !isInboxEmpty(tbody, startingIdx))
    {
        table.deleteRow(startingIdx)
    }

}

const isInboxEmpty = (tbody, tableStartIdx) => {
    return tbody.childNodes.length === tableStartIdx
}