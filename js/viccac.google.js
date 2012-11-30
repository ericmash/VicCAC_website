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
            var key, value;

            $.each(data.feed.entry, function (i, entry) {
                key = entry.gsx$key.$t;
                value = escapeHTML(entry.gsx$value.$t).split('\n').join('<br/>'); // escape html and convert new line to <br/>

                $('#' + key).html(value);
            });
        });
}

/**
 * Find the worksheet using the page body id
 *
 * @return {String} Worksheet id
 */
function getWorksheetId () {
    // to find out the worksheet id, use this api and find the information:
    // https://spreadsheets.google.com/feeds/worksheets/spreadsheet_id/private/full

    var pageId = $('body').attr('id');
    switch (pageId) {
        case 'frontpage-en':
            return 'od6';
        case 'agape':
            return 'od5';
        case 'canaan':
            return 'od4';
        case 'dive':
            return 'oda';
        case 'ecclesia':
            return 'od9';
        case 'eden':
            return 'odb';
        case 'fountain':
            return 'od8';
        case 'joshua':
            return 'ocy';
        case 'mercy':
            return 'ocz';
        case 'ruth':
            return 'ocw';
        case 'teenz':
            return 'ocx';
        case 'young':
            return 'od2';
        case 'zion':
            return 'od3';
        default:
            throw "page body id not supported. please check if the id matches the id on this page"
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