var Harness = Siesta.Harness.Browser.SenchaTouch;

Harness.configure({
    title         : 'Testing the To Do List Application',
    transparentEx : false,
    loaderPath    : { 'ToDoListApp' : '/Sencha%20Touch/todoapp/app' }
});

// NOTE: This harness assumes you have a local Sencha Touch 2.x SDK at the same place as your Siesta folder.

Harness.start(
    {
        group : 'To Do List',

        // Load these files for each ST 2.0 test
        preload : [
            "/_libs/sencha/sencha-touch-all-debug.js",
            "/_libs/sencha/resources/css/sencha-touch.css"
        ],
        items : [
            'tests/sanity.js',
            'tests/model.js',
            'tests/createTask.js'
        ]
    }
);

