chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if(message.action === 'showAlert'){
        const alertDiv = document.createElement('div');
        alertDiv.id = 'custom-alert';
        alertDiv.innerHTML = `
        <img src = "${chrome.runtime.getURL('images/logo.png')}" style="height: 40px;"/>
        <div class="alert-header">Privacy Alert!</div>
        <p>${message.organization} has had data or privacy violations!</p>
        <p>${message.incidentInfo}</p>
        <a href="about:blank"><button id="exit-page" class="alert-button">Exit Page</button></a>
        <button id="close-popup" class="alert-button">Ignore</button>
        `;

        document.body.appendChild(alertDiv);
        const ignoreButton = alertDiv.querySelector("#close-popup");
        ignoreButton.addEventListener("click", () => {
            alertDiv.remove();
        });

        sendResponse({status: "Alert shown"});
    }
})