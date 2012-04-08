var MyTaskListApp = function () {

    var tasks = [];
    var currentTaskIndex = -1;

    var loadTasks = function() {
        if (localStorage) {
            var storedTasks = localStorage["tasks"];
            if (!storedTasks) {
                localStorage["tasks"] = JSON.stringify(tasks);
            } 
            else {
                tasks = JSON.parse(storedTasks);
            }
        }
    };

    var syncStorage = function() {
        localStorage['tasks'] = JSON.stringify(tasks);
    };

    var displayTasks = function () {

        var createTapHandler = function(currentIndex) {
            return function () {
                MyTaskListApp.setCurrentTask(currentIndex);
                $.mobile.changePage('form.html');
            };
        };

        
        var list = $('#taskList');
        list.empty();

        for (var index = 0, length = tasks.length; index < length; ++index) {
            var task = tasks[index];
            var newLi = $('<li>');
            newLi.on('tap', createTapHandler(index));
            newLi.append(task.title);
            list.append(newLi);
        }

        list.listview('refresh');

    };

    var fillForm = function() {
        var task = tasks[currentTaskIndex];
        $('#taskName').val(task.title);
        $('#taskDescription').val(task.description);

        var flip = $('#taskCompleted');
        var value = (task.done) ? 1 : 0;
        flip[0].selectedIndex = value;
        flip.slider('refresh');
    };

    var updateCurrentTask = function() {
        var task = tasks[currentTaskIndex];
        task.title = $('#taskName').val();
        task.description = $('#taskDescription').val();
        task.done = ($('#taskCompleted').val() === 'yes');
    };

    var deleteCurrentTask = function() {
        tasks.splice(currentTaskIndex, 1);
    };

    return {
        Task: function () {
            console.log('inside the Task constructor');
            this.title = 'New task';
            this.description = 'Empty description';
            this.dueDate = new Date();
            this.done = false;
        },
        
        addTask: function (task) {
            console.log('adding a task');
            currentTaskIndex = tasks.length;
            tasks.push(task);
            console.log('number of tasks: ' + tasks.length);
            syncStorage();
        },

        init: function() {
            loadTasks();
        },

        refreshTasks: function () {
            displayTasks();
        },

        displayTask: function() {
            fillForm();
        },

        saveTask: function() {
            updateCurrentTask();
            syncStorage();
            $.mobile.changePage('index.html', { reverse: true });
        },

        setCurrentTask: function(index) {
            console.log('======================');
            console.log('selected index: ' + index);
            currentTaskIndex = index;
        },

        removeTask: function() {
            deleteCurrentTask();
            syncStorage();
            $.mobile.changePage('index.html', { reverse: true });
        }
    };
}();

$('#indexPage').live('pageinit', function() {
    MyTaskListApp.init();

    $('#addTaskButton').on('tap', function() {
        console.log('tapping the new task button');
        var newTask = new MyTaskListApp.Task();
        console.dir(newTask);
        MyTaskListApp.addTask(newTask);
    });
});

$('#formPage').live('pageinit', function() {

    $('#saveButton').on('tap', function() {
        MyTaskListApp.saveTask();
    });

});

$('#indexPage').live('pageshow', function () {
    MyTaskListApp.refreshTasks();
});

$('#formPage').live('pagebeforeshow', function () {
    MyTaskListApp.displayTask();
});


$('#deletePage').live('pageinit', function () {

    $('#confirmButton').on('tap', function() {
        MyTaskListApp.removeTask();
    });

});


