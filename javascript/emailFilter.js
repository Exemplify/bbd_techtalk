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
        filterRouter.addFilter("Chris", emailFolders.important)
        return result;
    }

}

const filterIfStatments = {
    
    applyFilter: (email) => {
        let result = {};
        if (email.subject.includes("Birthdays")) {
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
            from: "Birthdays",
            response: (email) => moveToFolder(email, emailFolders.birthday )
        },
        {
            from: "Tony",
            response: (email) =>  moveToFolder(email, emailFolders.spam )
        },
        {
            from : "A Gent NOT on Leave",
            response: (email) => moveToFolder(email, emailFolders.important)
        }
    ],

    default:{ 
        response: (email) => moveToFolder(email, emailFolders.inbox)
    },

    applyFilter: (email) => {
        let result = {...email}; 
        console.log(filterRouter.filters);
        const {response} = filterRouter.filters.find((filter) => {
            return email.from.includes(filter.from)
        }) || filterRouter.default;

        result = response(email);
        return result;
    },

    addFilter: (from, folder) =>
    {
        let result = {
            from: from, 
            response : (email) => 
            {
                console.log(folder);
                return moveToFolder(email, folder)

            }
        }
        filterRouter.filters.push(result);   
    }

}
