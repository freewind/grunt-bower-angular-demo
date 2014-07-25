requirejs.config({
  paths: {
    app: '/app/js/app',
    jquery: '/lib/jquery/jquery',
    angular: '/lib/angularjs/angular'
  },
  shim: {
    jquery1: {
      deps: [],
      exports: 'jq',
      init: function() {
        alert("sss");
        return this.$.noConflict();
      }
    }
  },
  map: {
    '*': { 'jquery': 'jquery-private'},
    'jquery-private': { 'jquery': 'jquery'}
  }
});

requirejs(['app',"jquery"], function(app, ss){
  alert($);
});
