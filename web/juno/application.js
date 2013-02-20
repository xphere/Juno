var Juno = function (elm, url, interval) {
    this.isRunning = false;
    this.elm       = elm;
    this.interval  = interval * 1000;
    this.url       = url;
};

Juno.prototype = {
    poll : function () {
        setInterval($.proxy(function () {
            if (this.isRunning) {
                return;
            }

            this.isRunning = true;
            this.get();

        }, this), this.interval);
    },
    get : function () {
        $.get(this.url, $.proxy(this.callback, this));
    },
    callback : function (data) {
        this.isRunning = false;
        this.elm.html(data);
    }
};

$(document).ready(function(){
    var elm = $('#content');

    if (elm.data('poll')) {
        var juno = new Juno(elm, window.location, 10);
        juno.poll();
    }
});
