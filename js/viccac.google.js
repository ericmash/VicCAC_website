/**
 * This library loads data from google spreadsheet and populates the loaded data to the matching elements
 */

var GOOGLE_SPREADSHEET_KEY = '0Amd70QSEewHzdDNPbXR4d0pKRjJpcWZzZHEtdG4wNEE';

$(document).ready(function () {
    var worksheetId = getWorksheetId();
    loadGoogleSpreadsheet(worksheetId);
});

/**
 * Load the google spreadsheet through its feed api and populate the html element by id or class
 * @param {String} worksheetId  Worksheet id
 */
function loadGoogleSpreadsheet (worksheetId) {
    var url = 'https://spreadsheets.google.com/feeds/list/' + GOOGLE_SPREADSHEET_KEY + '/' + worksheetId + '/public/values?alt=json-in-script&callback=?'
    $.getJSON(url,
        function (data) {
            var key, type, value;

            $.each(data.feed.entry, function (i, entry) {
                key = entry.gsx$key.$t;
                type = entry.gsx$type.$t;
                value = escapeHTML(entry.gsx$value.$t).split('\n').join('<br/>'); // escape html and convert new line to <br/>

                if (type === 'class') {
                    $('.' + key).html(value);
                } else {
                    // TODO need refactor for multiple elements of the same class
                    $('#' + key).html(value);
                }
            });
        });
}

/**
 * Find the worksheet using the page body id
 *
 * @return {String} Worksheet id
 */
function getWorksheetId () {
    var pageId = $('body').attr('id');

    // to find out the worksheet id, use this api and find the information:
    // https://spreadsheets.google.com/feeds/worksheets/spreadsheet_id/private/full
    switch (pageId) {
        case 'frontpage-en':
            return 'od6';
        case 'canaan':
            return 'od4';
    }
}

/**
 * Escape html to avoid html injection
 *
 * @param   {String} text       Text to be escaped
 * @return  {String} Escaped text
 */
function escapeHTML(text) {
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}