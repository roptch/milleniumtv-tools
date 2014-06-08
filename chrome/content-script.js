(function() {
    function execWhenClassFound(className, callback) {
        setTimeout(function() {
            var elements = document.getElementsByClassName(className);

            if (elements.length > 0) {
                callback(elements);
            } else {
                execWhenClassFound(className, callback);
            }
        }, 200);
    }

    function replaceParamInUrl(url, param, value) {
        var splitUrl = url.split('?');
        var newUrl = splitUrl[0];
        var queryString = splitUrl[1];

        if (splitUrl.length >= 2) {
            var vars = queryString.split('&');

            for (var i = 0; i < vars.length; ++i) {
                var pair = vars[i].split('=');

                if (i == 0)
                    newUrl += '?';
                else
                    newUrl += '&';

                if (pair[0] == param)
                    newUrl += pair[0] + '=' + value;
                else
                    newUrl += pair[0] + '=' + pair[1];
            }
        }

        return newUrl;
    }

    function getUrlParam(url, param) {
        var splitUrl = url.split('?');
        var queryString = splitUrl[1];

        if (splitUrl.length >= 2) {
            var vars = queryString.split('&');

            for (var i = 0; i < vars.length; ++i) {
                var pair = vars[i].split('=');

                if (pair[0] == param)
                    return pair[1];
            }
        } else
            return null;
    }

    function manageUnblockQuest(isHidden) {
        if (isHidden === true) {
            execWhenClassFound('UnblockQuest-v2', function(layers) {
                for (i = 0; i < layers.length; ++i) {
                    layers[i].style.display = 'none';
                }
            });
        }
    }

    function manageVolume(volume) {
        if (getUrlParam(document.URL, 'volume') != (volume * 10) - 1)
            window.location.href = replaceParamInUrl(document.URL, 'volume', (volume * 10) - 1);
    }

    window.onload = function() {
        chrome.storage.sync.get({'quality': 720, 'hideUnblockQuest': true, 'volume': 0}, function(data) {
            manageUnblockQuest(data.hideUnblockQuest);

            manageVolume(data.volume);

            execWhenClassFound('available', function(elems) {
                var qualityList = ['1080', '720', '480', '380', '240'];
                var availableQualityList = [];
                var activeQuality;
                var selectedQuality;

                // Getting all available quality labels in variable "availableQualityList"
                for (var i = 0; i < elems.length; ++i) {
                    var classList = elems[i].className.split(' ');
                    var quality = classList[1].split('-')[2];

                    // Saving the current quality in "activeQuality"
                    if (classList.indexOf('active') != -1)
                        activeQuality = quality;

                    availableQualityList.push(quality);
                }

                var mergedQualityList = [];
                for (var i = 0; i < qualityList.length; ++i) {
                    if (availableQualityList.indexOf(qualityList[i]) != -1)
                        mergedQualityList.push(qualityList[i]);
                    else
                        mergedQualityList.push(null);
                }

                var i = qualityList.indexOf(data.quality);
                while (i < mergedQualityList.length && mergedQualityList[i] == null)
                    ++i;

                if (i == mergedQualityList.length)
                    selectedQuality = availableQualityList[availableQualityList.length - 1];
                else
                    selectedQuality = mergedQualityList[i];

                if (selectedQuality == activeQuality)
                    return ;

                window.location.href = replaceParamInUrl(document.URL, 'quality', selectedQuality);
            });
        });
    }
})();
