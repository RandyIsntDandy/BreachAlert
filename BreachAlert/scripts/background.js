chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url || changeInfo.status === 'complete') {

        const currentSite = tab.url.replace("https://","").replace("www.","").split("/")[0];
        fetch(chrome.runtime.getURL("privacy_database.json"))
            .then(response => response.json())
            .then(data =>{
                const incidents = data.filter(entry => entry.domain === currentSite);

                if(incidents.length > 0){
                    let incidentData = "<ol>";
                    let orgName = incidents[0].company;
                    incidents.forEach(entry => {
                        incidentData += "<li><a href=" + entry.sources + " target='_blank'>" + entry.category + "</a>  " + entry.last_incident + "</li>";
                    });
                    incidentData += "</ol>";
                    chrome.tabs.sendMessage(tabId,{
                        action: 'showAlert',
                        organization: orgName,
                        url: tab.url,
                        incidentInfo: incidentData
                    }, (response) => {
                        if(chrome.runtime.lastError){
                            console.log("Error sending message: ", chrome.runtime.lastError.message);
                        }
                    });
                }
            });
    }
});