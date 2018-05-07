// This is the js for the default/index.html view.

var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

     // Enumerates an array.
    var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};

    function get_memos_url(start_idx, end_idx){
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        //replace this
        return memos_url+"?"+$.param(pp);
    }
    self.get_memos = function() {
        $.getJSON(get_memos_url(0,10), function(data){
            self.vue.memos = data.memos;
            self.vue.has_more = data.has_more;
            self.vue.logged_in = data.logged_in;
            enumerate(self.vue.memos);
        })
    };

    self.get_more = function() {
        var num_memos = self.vue.memos.length;
        $.getJSON(get_memos_url(num_memos, num_memos + 10), function(data){
            self.vue.has_more = data.has_more;
            self.extend(self.vue.memos, data.memos);
            enumerate(self.vue.memos);
        });
    };

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            memos:[],
            logged_in:  false,
            has_more: false
        },
        methods: {
            get_more:self.get_more
        }

    });
    self.get_memos();
    $("#vue-div").show();

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
