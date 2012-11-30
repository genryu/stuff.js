define(function (require, exports) {
  'use strict';
  var stuff = require('lib/stuff')
    , assert = require('vendor/assert');

  var path = 'http://localhost:8888/index.html';

  exports.init = function () {
    describe('Stuff', function () {
      it('should create iframe', function (done) {
        stuff(path, function (context) {
          assert.ok(context);
          done();
        });
      });

      it('should clear all iframes', function (done) {
        // create one more.
        stuff(path, function (context) {
          assert.equal(document.querySelectorAll('iframe').length, 2);
          stuff.clear();
          assert.equal(document.querySelectorAll('iframe').length, 0);
          done();
        });
      });
    });

    describe('Context', function () {
      var testHtml = '<html><head></head><body>wat</body></html>'
        , context;

      before(function (done) {
         stuff(path, function (c) {
            context = c;
            done();
         });
      });

      describe('#load', function () {        
        it('should load some html', function (done) {
          context.load(testHtml, function () {
            done();
          });
        });
      });

      describe('#html', function () {        
        it('should should tell it\'s html', function (done) {
          context.html(function (html) {
            assert.equal(html, testHtml);
            done();
          });
        });
      });

      describe('#evaljs', function () {
        it('should do basic js eval', function () {
          context.evaljs('1+1', function (e, res) {
            if (e) throw e;
            assert.equal(2, res);
          });
        });
      });
    });
  };

});
