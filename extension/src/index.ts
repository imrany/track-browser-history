
function onAnchorClick(event:any) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}
  
// Search history to find up to ten links that a user has typed in,
// and show those links in a popup.
function buildTypedUrlList() {
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
      console.log(historyItems)
    }
  );
}

setInterval(()=>{
  // buildTypedUrlList()
},500);

async function fetchData() {
  const response = await fetch('https://google.com')
  console.log(response);
}

document.addEventListener('DOMContentLoaded', function () {
  buildTypedUrlList()
  fetchData()
});
  
