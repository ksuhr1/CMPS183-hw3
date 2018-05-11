// This is the js for the default/index.html view.
//
// var app = function() {
//
//     var self = {};
//
//     Vue.config.silent = false; // show all warnings
//
//     // Extends an array
//     self.extend = function(a, b) {
//         for (var i = 0; i < b.length; i++) {
//             a.push(b[i]);
//         }
//     };
//
//      // Enumerates an array.
//     var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};
//
//     function get_memos_url(start_idx, end_idx){
//         var pp = {
//             start_idx: start_idx,
//             end_idx: end_idx
//         };
//         //replace this
//         return memos_url + "?" + $.param(pp);
//     }
//     self.get_memos = function() {
//         $.getJSON(get_memos_url(0,10), function(data){
//             self.vue.memos = data.memos;
//             self.vue.has_more = data.has_more;
//             self.vue.logged_in = data.logged_in;
//             enumerate(self.vue.memos);
//         })
//     };
//
//     self.get_more = function() {
//         var num_memos = self.vue.memos.length;
//         $.getJSON(get_memos_url(num_memos, num_memos + 10), function(data){
//             self.vue.has_more = data.has_more;
//             self.extend(self.vue.memos, data.memos);
//             enumerate(self.vue.memos);
//         });
//     };
//
//     self.add_memo_button = function() {
//         //The button to add a memo has been pressed.
//         if(self.vue.logged_in)
//             self.vue.is_adding_memo = !self.vue.is_adding_memo;
//     };
//
//     // self.add_memo = function () {
//     //     $.post(add_memo_url,
//     //         {
//     //             title: self.vue.form_title,
//     //             content: self.vue.form_content
//     //         },
//     //         function (data) {
//     //             $.web2py.enableElement($("#add_memo_submit"));
//     //             self.vue.memos.unshift(data.memo);
//     //             console.log(self.vue.memos.length);
//     //             enumerate(self.vue.memos);
//     //             self.vue.is_adding_memo = !self.vue.is_adding_memo;
//     //             self.vue.form_content="";
//     //             self.vue.form_title="";
//     //         });
//     // };
//
//     // Complete as needed.
//     self.vue = new Vue({
//         el: "#vue-div",
//         delimiters: ['${', '}'],
//         unsafeDelimiters: ['!{', '}'],
//         data: {
//             is_adding_memo:false,
//             memos:[],
//             logged_in: false,
//             has_more: false,
//             form_content: null,
//             form_title: null,
//             show: true
//         },
//         methods: {
//             get_more:self.get_more,
//             add_memo_button: self.add_memo_button,
//             add_memo: self.add_memo
//         }
//
//     });
//     self.get_memos();
//     $("#vue-div").show();
//
//     return self;
// };
//
// var APP = null;
//
// // This will make everything accessible from the js console;
// // for instance, self.x above would be accessible as APP.x
// jQuery(function(){APP = app();});

var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    function get_memos_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return memos_url + "?" + $.param(pp);
    }

    self.get_memos = function () {
        $.getJSON(get_memos_url(0, 10), function (data) {
            self.vue.memos = data.memos;
            self.vue.has_more = data.has_more;
            self.vue.logged_in = data.logged_in;
        })
    };

    self.get_more = function () {
        var num_memos = self.vue.memos.length;
        $.getJSON(get_memos_url(num_memos, num_memos + 10), function (data) {
            self.vue.has_more = data.has_more;
            self.extend(self.vue.memos, data.memos);
        });
    };

    self.add_memo_button = function () {
        // The button to add a memo has been pressed.
        self.vue.is_adding_memo = !self.vue.is_adding_memo;
    };

    self.add_memo = function () {
        // The submit button to add a memo has been added.
        $.post(add_memo_url,
            {
                title: self.vue.form_title,
            },
            function (data) {
                $.web2py.enableElement($("#add_memo_submit"));
                self.vue.memos.unshift(data.memo);
            });
    };

    self.delete_memo = function(memo_id) {
        $.post(del_memo_url,
            {
                memo_id: memo_id
            },
            function () {
                var idx = null;
                for (var i = 0; i < self.vue.memos.length; i++) {
                    if (self.vue.memos[i].id === memo_id) {
                        // If I set this to i, it won't work, as the if below will
                        // return false for items in first position.
                        idx = i + 1;
                        break;
                    }
                }
                if (idx) {
                    self.vue.memos.splice(idx - 1, 1);
                }
            }
        )
    };


    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            is_adding_memo: false,
            memos: [],
            logged_in: false,
            has_more: false,
            form_title: null

        },
        methods: {
            get_more: self.get_more,
            add_memo_button: self.add_memo_button,
            add_memo: self.add_memo,
            delete_memo: self.delete_memo
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