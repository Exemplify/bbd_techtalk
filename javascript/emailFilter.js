const emailFolders = {
    inbox: 0,
    birthday: 1,
    spam: 2, 
    important : 3
};

const moveToFolder =  (email, folder) => {
    let result = {...email};
    result.folder = folder;
    return result;
}

const emailFilter = {
    
    filterEmails : (emails)=> {
        let result = []
        emails.forEach( ( email )=> {
            result.push(filterIfStatments.applyFilter(email));
        });
        return result;
    }

}

const filterIfStatments = {
    
    applyFilter: (email) => {
        let result = {};
        if (email.subject.includes("Birthday")) {
            result = moveToFolder(email, emailFolders.birthday );
        }
        else if (email.from.includes("Tony")) {
            result = moveToFolder(email, emailFolders.spam );
        }
        else if(email.from.includes("A Gent NOT on Leave") ){
            result = moveToFolder(email, emailFolders.important);
        }
        else {
            result = moveToFolder(email, emailFolders.inbox);
        }
        return result;
    }

}

