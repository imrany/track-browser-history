function onAnchorClick(event) {
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
  let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  let oneWeekAgo = new Date().getTime() - microsecondsPerWeek;

  // Track the number of callbacks from chrome.history.getVisits()
  // that we expect to get.  When it reaches zero, we have all results.
  chrome.history.search(
    {
      text: '', // Return every history item....
      startTime: oneWeekAgo // that was accessed less than one week ago.
    },
    function (historyItems) {
      console.log(historyItems)
    }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  buildTypedUrlList()
});
