(function() {
    window.onload = function() {
        unblockQuestCheckbox = document.getElementById('unblockquest');

        chrome.storage.sync.get('hideUnblockQuest', function(data) {
            unblockQuestCheckbox.checked = data.hideUnblockQuest;
        });

        unblockQuestCheckbox.onchange = function() {
            chrome.storage.sync.set({'hideUnblockQuest': unblockQuestCheckbox.checked});
        }
    }
})();
