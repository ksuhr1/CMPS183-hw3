
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

    function get_memos_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
<<<<<<< HEAD
        //replace this
        return memos_url + "?" + $.param(pp);
    }


    self.get_memos = function() {
        $.getJSON(get_memos_url(0,10), function(data){
=======
        return memos_url + "?" + $.param(pp);
    }

    self.get_memos = function () {
        $.getJSON(get_memos_url(0, 10), function (data) {
>>>>>>> phase3
            self.vue.memos = data.memos;
            self.vue.has_more = data.has_more;
            self.vue.logged_in = data.logged_in;
            enumerate(self.vue.memos);
        })
    };

    self.get_more = function () {
        var num_memos = self.vue.memos.length;
        $.getJSON(get_memos_url(num_memos, num_memos + 10), function (data) {
            self.vue.has_more = data.has_more;
            self.extend(self.vue.memos, data.memos);
            enumerate(self.vue.memos);
        });
    };

    self.add_memo_button = function () {
<<<<<<< HEAD
        // The button to add a track has been pressed.
        self.vue.is_adding_memo = !self.vue.is_adding_memo;
    };

     self.add_memo = function () {
        // The submit button to add a track has been added.
        $.post(add_memo_url,
            {
                title: self.vue.form_title,
                content: self.vue.form_content,
            },
            function (data) {
                $.web2py.enableElement($("#add_memo_submit"));
                self.vue.tracks.unshift(data.memo);
                self.vue.is_adding_memo = !self.vue.is_adding_memo;
                self.vue.form_content="";
              //  enumerate(self.vue.memos);
            });
    };


    // Complete as needed.
=======
        // The button to add a memo has been pressed.
        if(self.vue.logged_in)
            self.vue.is_adding_memo = !self.vue.is_adding_memo;
    };


    self.add_memo = function () {
        // The submit button to add a memo has been added.
        $.post(add_memo_url,
            {
                title: self.vue.form_title,
                memo_content: self.vue.form_content
            },
            function (data) {
                $.web2py.enableElement($("#add_memo_submit"));
                self.vue.memos.unshift(data.memo);
                console.log(self.vue.memos.length);
                enumerate(self.vue.memos);

                //if memos have length greater than 10, has_more is true
                if(self.vue.memos.length > 10 ){
                    self.vue.has_more = true;
                }
                self.vue.is_adding_memo = !self.vue.is_adding_memo;
                self.vue.form_title="";
                self.vue.form_content="";
            });
    };

    self.toggle_memo = function(memo_idx) {
          var memo = self.vue.memos[memo_idx];
          memo.is_public = !memo.is_public;
          $.post(toggle_memo_url,
          {
            memo_id: memo.id
          },
          function () {
            var idx = null;
            for (var i = 0; i < self.vue.memos.length; i++) {
              if (self.vue.memos[i].id === memo_idx) {
                idx = i + 1;
                break;
              }
            }
          })
        console.log(memo)

    };


    self.edit_memo_submit = function () {
        // The submit button to add a track has been added.
        $.post(edit_memo_url,
            {
                title:self.vue.edit_title,
                memo_content: self.vue.edit_content,
                id: self.vue.edit_id
            },
            function (data) {
                $.web2py.enableElement($("#edit_memo_submit"));
                self.vue.is_being_edited = !self.vue.is_being_edited;
            });
    };
    
    
    self.edit_memo = function(memo_id) {
        console.log("Editing mode");
        self.vue.is_being_edited = !self.vue.is_being_edited;
        self.vue.edit_id = memo_id;
    };

    self.cancel_edit = function () {
        self.vue.is_being_edited = !self.vue.is_being_edited;
        self.vue.edit_id = 0;
        console.log(self.vue.form_title);

    };

    self.delete_memo = function(memo_idx) {
        $.post(del_memo_url,
            {memo_id: self.vue.memos[memo_idx].id },
            function(){
                self.vue.memos.splice(memo_idx,1);
                enumerate(self.vue.memos);
            }
        )
    };


>>>>>>> phase3
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
<<<<<<< HEAD
            is_adding_memo: false,
            memos: [],
            logged_in: false,
            has_more: false,
            form_title: null,
            form_content: null,

        },
        methods: {
            get_more:self.get_more,
            add_memo_button: self.add_memo_button,
            add_memo: self.add_memo
=======
            memos: [],
            is_adding_memo: false,
            logged_in: false,
            is_being_edited: false,
            get_more: false,
            has_more: false,
            form_content: null,
            form_title: null,
            edit_content: null,
            edit_title: null,
            show: true,
            is_public: false,
            edit_id: 0
        },
        methods: {
            get_more: self.get_more,
            add_memo_button: self.add_memo_button,
            add_memo: self.add_memo,
            delete_memo: self.delete_memo,
            edit_memo: self.edit_memo,
            cancel_edit: self.cancel_edit,
            toggle_memo: self.toggle_memo,
            edit_memo_submit: self.edit_memo_submit
>>>>>>> phase3
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