requirejs.config({
  baseUrl: '/public/js',
  paths: {
    app: 'app',
    hello: 'hello',
    jquery: 'lib/jquery/jquery',
    angular: 'lib/angularjs/angular'
  },
  shim: {
    angular : { exports : 'angular'},
    hello : { exports: 'hello' }
  },
  priority: ["angular"],
  map: {
    '*': { 'jquery': 'jquery-private'},
    'jquery-private': { 'jquery': 'jquery'}
  }
});

requirejs(['app', 'hello'], function(app, hello) {
  hello();
});
