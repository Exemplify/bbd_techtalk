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
            result.push(filterRouter.applyFilter(email));
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

const filterRouter = {

    filters: [
        {
            condition: (email) => email.subject.includes("Birthday"),
            response: (email) => moveToFolder(email, emailFolders.birthday )
        },
        {
            condition: (email) => email.from.includes("Tony"),
            response: (email) =>  moveToFolder(email, emailFolders.spam )
        },
        {
            condition: (email) => email.from.includes("A Gent NOT on Leave"),
            response: (email) => moveToFolder(email, emailFolders.important)
        }
    ],

    default:{ 
        response: (email) => moveToFolder(email, emailFolders.inbox)
    },

    applyFilter: (email) => {
        let result = {...email}; 
        let chosenFilter = filterRouter.filters.find((filter) => filter.condition(email)) || filterRouter.default
        result = chosenFilter.response(email);
        return result;
    }

}
