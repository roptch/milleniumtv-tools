(function() {
    window.onload = function() {
        chrome.storage.sync.get('hideUnblockQuest', function(data) {
            if (data.hideUnblockQuest === true) {
                interval = setInterval(function() {
                    layers = document.getElementsByClassName('UnblockQuest-v2');
                    if (layers.length > 0) {
                        clearInterval(interval);
                        for (i = 0; i < layers.length; ++i) {
                            layers[i].style.display = 'none';
                        }
                    }
                }, 200);
            }
        });
    }
})();
