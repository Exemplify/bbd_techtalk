let emails = [];
let currentFolder = emailFolders.inbox;
let applyEmailFilter = true;


(function(window, document, undefined){

    window.onload = init;
    
      function init(){
        emails = getEmails();
        emails = applyEmailFilter ? emailFilter.filterEmails(emails) : emails;
        loadInbox(emails);
      }
    
    })(window, document, undefined);


function updateInbox(value){
  value = parseInt(value, 10);
  if(value === currentFolder )
    return;
  currentFolder = value;

  emails = applyEmailFilter ? emailFilter.filterEmails(emails) : emails;
  updateEmailFolder(emails, currentFolder);
}

    

