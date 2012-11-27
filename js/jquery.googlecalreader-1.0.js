/**
 * Modified from jquery.googlecalreader plugin
 *
 * Google Calendar feed reader - plugin to get upcoming events from a *public* google calendar
 * Parameters: FeedUri, MaxResults & DisplayCount
 * README: Make sure that your gCal feed url end with "/public/full".
 * @version 1.0
 */

(function ($) {

    //Resize image on ready or resize
    $.gCalReader = function (options) {
        var settings, feedUri;

        //Default settings
        settings = {
            feedUri: 'http://www.google.com/calendar/feeds/en.usa%23holiday%40group.v.calendar.google.com/public/full',
            maxresults: 20,
            displayCount: true,
            // show location label even if no location is set
            isDisplayMissingInfo: false,
            callbackFn: $.noop()
        };

        feedUri = options.feedUri;
        if (feedUri.indexOf("public/full") === -1) {
            feedUri = settings.feedUri;
        }

        options = $.extend(settings, options);

        function _run() {
            var calendarService, query, toDateString, toTimeString, generateEventHtml, callback, handleError;

            calendarService = new google.gdata.calendar.CalendarService('GoogleInc-jsguide-1.0');

            // The "public/full" feed is used to retrieve events from the named public calendar with full projection.
            query = new google.gdata.calendar.CalendarEventQuery(feedUri);
            query.setOrderBy('starttime');
            query.setSortOrder('ascending');
            query.setFutureEvents(true);
            query.setSingleEvents(true);
            query.setMaxResults(options.maxresults);

            /**
             * Covert date to date string
             * e.g. Sun May 5
             *
             * @param   {Date}  date    Date to be converted
             * @return  {String}    A string that represents the date
             */
            toDateString = function (date) {
                var d_names = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
                    m_names = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                    dayOfWeek = d_names[date.getDay()],
                    month = m_names[date.getMonth()],
                    dayOfMonth = date.getDate();

                return dayOfWeek + ' ' + month + ' ' + dayOfMonth;
            };

            /**
             * Convert date to time string
             * e.g 12:30 am
             *
             * @param   {Date}  date    Date to be converted
             * @return  {String}    A string that represents the time
             */
            toTimeString = function (date) {
                var amOrPm = date < 12 ? 'am' : 'pm',
                    hour = date.getHours(),
                    min = date.getMinutes();

                if (hour === 0) {
                    hour = '12';
                } else if (hour > 12) {
                    hour = (hour - 12).toString();
                } else {
                    hour = hour.toString();
                }

                if (min.toString().length === 1) {
                    min = '0' + min;
                }

                return hour + ':' + min + amOrPm;
            };

            generateEventHtml = function (event) {
                var title = event.getTitle().getText(),
                    description = event.getContent().getText(),
                    location = event.getLocations()[0].getValueString(),
                    times = event.getTimes(),
                    startDateTime,
                    endDateTime,
                    isShowTime,
                    eventDate,
                    dateString,
                    timeHtml,
                    locationHtml,
                    descriptionHtml;

                // TODO-EM probably will break for recurring event
                if (times.length > 0) {
                    startDateTime = times[0].getStartTime();
                    endDateTime = times[0].getEndTime();
                    isShowTime = !startDateTime.dateOnly;
                    eventDate = startDateTime.getDate();
                }

                dateString = toDateString(eventDate);

                if (isShowTime) {
                    dateString = dateString + ', ' + toTimeString(eventDate);

                    if (!endDateTime.dateOnly) {
                        dateString = dateString + ' - ' + toTimeString(endDateTime.getDate());
                    }
                }

                timeHtml = '</div class="time">' +
                        '<span class="time-label">When: </span><span class="time-value">' + dateString + '</span>' +
                        '</div>';

                locationHtml = (!location) ? '' :
                        '<div class="location">' +
                            '<span class="location-label">Where: </span><span class="location-value">' + location + '</span>' +
                            '</div>';

                descriptionHtml = (!description) ? '' :
                        '<div class="description">' + description + '</div>';

                return '<div class="event-title">' + title + timeHtml + locationHtml + descriptionHtml + '</div>';
            };

            callback = function (result) {
                var entries = result.feed.getEntries(),
                    length = entries.length,
                    i;

                $('#gcal').html('');

                if (options.displayCount) {
                    $('#gcal').html(length + ' upcoming events');
                }

                $('#gcal').append('<ul id="eventlist" class="event-list"></ul>');

                for (i = 0; i < length; i = i + 1) {
                    $('#eventlist').append('<li class="event-item">' + generateEventHtml(entries[i]) + '</li>');
                }

                options.callbackFn.call();
            };

            // Error handler to be invoked when getEventsFeed() produces an error
            handleError = function (error) {
                $('#gcal').html('<pre>' + error + '</pre>');
            };

            // Submit the request using the calendar service object
            calendarService.getEventsFeed(query, callback, handleError);
        }

        google.setOnLoadCallback(_run);
    };

})(jQuery);