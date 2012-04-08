var Task = function () {
    var completed = false;
    var date = new Date();
    var name = "";
    var description = null;

    return {
        markAsDone: function() {
            completed = true;
        },

        resetDoneStatus: function () {
            completed = false;
        },

        isCompleted: function () {
            return completed;
        },

        setDate: function(newDate) {
            date = newDate;
        },

        getDate: function () {
            return date;
        },

        setName: function (newName) {
            name = newName;
        },

        getName: function () {
            return name;
        },

        setDescription: function (newDescription) {
            description = newDescription;
        },

        getDescription: function () {
            return description;
        }
    };
};

