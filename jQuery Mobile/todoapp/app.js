var MyTaskListApp = function () {

    var tasks = [];
    var currentTaskIndex = -1;

    var loadTasks = function() {
        if (localStorage) {
            var storedTasks = localStorage["tasks"];
            if (!storedTasks) {
                syncStorage();
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
            return function (event, data) {
                MyTaskListApp.setCurrentTask(currentIndex);
            };
        };

        var createMarkAsDoneTapHandler = function(currentIndex) {
            return function(event, data) {
                MyTaskListApp.toggleCurrentTaskAsDone(currentIndex);

                // This is required to make the event handler work properly
                event.preventDefault();
            };
        };

        var list = $('#taskList');
        list.empty();

        for (var index = 0, length = tasks.length; index < length; ++index) {
            var task = tasks[index];
            
            var editLink = $('<a>');
            editLink.attr('href', 'form.html');
            editLink.attr('data-transition', 'slide');
            editLink.bind('tap', createTapHandler(index));
            editLink.append(task.title);

            var doneLink = $('<a>');
            doneLink.bind('tap', createMarkAsDoneTapHandler(index));

            var className = (task.done) ? 'taskdone' : 'tasknotdone';
            editLink.attr('class', className);

            var newLi = $('<li>');
            newLi.append(editLink);
            newLi.append(doneLink);
            list.append(newLi);
        }

        // The 'true' parameter is required for the inset effect to be applied
        list.listview('refresh', true);
        $('#counter').html(tasks.length + ' tasks');
    };

    var fillForm = function() {
        var task = tasks[currentTaskIndex];
        $('#taskName').val(task.title);
        $('#taskDescription').val(task.description);
        $('#taskDate').val(task.dueDate);

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
        task.dueDate = $('#taskDate').val();
    };

    var deleteCurrentTask = function() {
        tasks.splice(currentTaskIndex, 1);
    };

    var toggleTask = function(index) {
        var task = tasks[index];
        task.done = !task.done;
    };

    return {
        Task: function () {
            this.title = 'New task';
            this.description = 'Empty description';
            this.dueDate = new Date();
            this.done = false;
        },
        
        addTask: function (task) {
            currentTaskIndex = tasks.length;
            tasks.push(task);
            syncStorage();
            displayTasks();
        },

        init: function() {
            loadTasks();
            displayTasks();
        },

        displayTask: function() {
            fillForm();
        },

        saveTask: function() {
            updateCurrentTask();
            syncStorage();
            displayTasks();
            $.mobile.changePage('index.html', {
                transition: 'slide',
                reverse: true
            });
        },

        setCurrentTask: function(index) {
            currentTaskIndex = index;
        },

        toggleCurrentTaskAsDone: function(index) {
            toggleTask(index);
            syncStorage();
            displayTasks();
        },

        removeTask: function() {
            deleteCurrentTask();
            syncStorage();
            displayTasks();
            $.mobile.changePage('index.html', {
                transition: 'slide',
                reverse: true
            });
        }
    };
}();

$('#indexPage').live('pageinit', function() {
    MyTaskListApp.init();

    $('#addTaskButton').bind('tap', function(event, data) {
        var newTask = new MyTaskListApp.Task();
        console.dir(newTask);
        MyTaskListApp.addTask(newTask);
    });
});

$('#formPage').live('pageinit', function() {
    $('#saveButton').bind('tap', function(event, data) {
        MyTaskListApp.saveTask();
        
        // This is required to avoid weird redirections
        event.preventDefault();
    });
});

$('#formPage').live('pagebeforeshow', function () {
    MyTaskListApp.displayTask();
});

$('#deletePage').live('pageinit', function () {
    $('#confirmButton').bind('tap', function(event, data) {
        MyTaskListApp.removeTask();
    });
});

