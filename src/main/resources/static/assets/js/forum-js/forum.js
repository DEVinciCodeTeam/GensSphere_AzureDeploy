validateCurrentUser();


const forumName = document.location.pathname.split("/")[3].split(".")[0];

if (forumName === "forum") {forumFunctionality("forum1Posts")} else {forumFunctionality(forumName+"Posts")}