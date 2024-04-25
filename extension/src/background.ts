chrome.runtime.onInstalled.addListener((details) => {
  if(details.reason !== "install" && details.reason !== "update") return;
  //console.log("Starting background script...")
});

let browser:string;
let agent:string=navigator.userAgent
if(agent.indexOf("Chrome")){
    browser="Google Chrome"
}else if(agent.indexOf("Opera")){
    browser="Opera"
}else if(agent.indexOf("MSIE")){
    browser="Internet Explorer"
}else if(agent.indexOf("Firefox")){
    browser="Firefox"
}else{
    browser=agent
}

function getHistory(){
    let history:any={
        user_browser:browser,
        user_history:[]
    };

   // To look for history items visited in the last week,
  // subtract a week of microseconds from the current time.
  // let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  let microsecondsPerDay = 1000 * 60 * 60 * 24;
  let oneDayAgo = new Date().getTime() - microsecondsPerDay;

  // Track the number of callbacks from chrome.history.getVisits()
  // that we expect to get.  When it reaches zero, we have all results.
  chrome.history.search(
    {
      text: '', // Return every history item....
      startTime: oneDayAgo // that was accessed less than one week ago.
    },
    function (historyItems:any) {
      history.user_history.push(...historyItems)
      socket.send(JSON.stringify(history));      
    }
  );
  return history
}

const socket=new WebSocket("ws://localhost:8000");
socket.onopen=(event:any)=>{
    console.log("WebSocket connected");
}

socket.onmessage = (event:any)=>{
    let message=event.data;
    
    // Check if the message is a Blob
    if (message instanceof Blob) {
        var reader = new FileReader();
        reader.onload = ()=>{
            let text:any = reader.result;
            console.log(JSON.parse(text))
        };
        reader.readAsText(message);
    } else {
        // If the message is not a Blob, treat it as a string
        console.log(message)
    }
};

socket.onclose = (event:any)=>{
  console.log('WebSocket closed.');
};

socket.onerror = (error:any)=>{
  console.error('WebSocket error:', error);
};

getHistory()
