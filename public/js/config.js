requirejs.config({
  baseUrl: '/public/js',
  paths: {
    app: 'app',
    hello: 'hello',
    hello2: 'hello2',
    jquery: 'lib/jquery/jquery',
    angular: 'lib/angularjs/angular',
    'app.controllers': 'controllers'
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

requirejs(['app']);
