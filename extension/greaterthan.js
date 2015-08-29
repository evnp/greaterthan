var base_url = 'http://localhost:5000';

function request(sub_url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', base_url + '/' + sub_url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback.call(xhr, JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}

var url_map = {};

request('', function (response) {
    url_map = response;
});

function redirect(url) {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.update(tab.id, { url: url });
    });
}

chrome.omnibox.onInputEntered.addListener(function(keyword) {
    if (url_map.hasOwnProperty(keyword)) {
        redirect(url_map[keyword]);
    } else {
        request('lookup/' + keyword, function (response) {
            if (response.result) {
                redirect(url_map[keyword] = response.result);
            } else {
                var new_url = prompt(
                    'Nothing exists here yet. Would you like ' +
                    'to choose a url for this to point to?'
                );
                if (new_url) {
                    request('new/' + keyword + '/' + new_url, function (response) {
                        if (response.success) {
                            redirect(url_map[keyword] = new_url);
                            alert('Nice. Your url was set up successfully.');
                        } else {
                            alert('Uh oh, something went wrong. Bug Evan.');
                        }
                    });
                }
            }
        });
    }
});
