(function() {
    function manageUnblockQuest() {
        var unblockQuestCheckbox = document.getElementById('unblockquest');

        chrome.storage.sync.get({'hideUnblockQuest': true}, function(data) {
            unblockQuestCheckbox.checked = data.hideUnblockQuest;
        });

        unblockQuestCheckbox.onchange = function() {
            chrome.storage.sync.set({'hideUnblockQuest': unblockQuestCheckbox.checked});
        }
    }

    function manageQuality() {
        var qualitySelect = document.getElementById('quality');

        chrome.storage.sync.get({'quality': 720}, function(data) {
            qualitySelect.value = data.quality;
        });

        qualitySelect.onchange = function() {
            chrome.storage.sync.set({'quality': qualitySelect.value});
        }
    }

    function manageVolume() {
        var volumeRange = document.getElementById('volume');

        chrome.storage.sync.get({'volume': 0}, function(data) {
            volumeRange.value = data.volume;
        });

        volumeRange.onchange = function() {
            chrome.storage.sync.set({'volume': volumeRange.value});
        }
    }

    window.onload = function() {
        manageUnblockQuest();
        manageQuality();
        manageVolume();
    }
})();
