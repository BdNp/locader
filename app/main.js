require.config({
    baseUrl: "js",
    paths: {
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min',
        'angularAMD': 'lib/angularAMD.min',
        'ngload': 'lib/ngload.min'
    },
    shim: {
        'angularAMD': ['angular'],
        'ngload': ['angularAMD']
    },    
    deps: ['app']
});