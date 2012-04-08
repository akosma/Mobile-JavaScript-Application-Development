describe ("Task", function() {
    var task = null;

    beforeEach (function() {
        task = new Task();
    });

    describe ("when a new one is created", function () {
        it ("should have an empty description", function () {
            expect(task.getDescription()).toBeNull();
        });

        it ("should have an empty name", function () {
            expect(task.getName()).toEqual("");
        });

        it ("should not be completed", function () {
            expect(task.isCompleted()).toBeFalsy();
        });
    });

    describe ("when one is modified", function () {
        it ("should have the description passed as parameter", function () {
            var newDescription = "Whatever";
            task.setDescription(newDescription);
            expect(task.getDescription()).toEqual(newDescription);
        });

        it ("should have the specified date", function () {
            var newDate = new Date();
            task.setDate(newDate);
            expect(task.getDate()).toEqual(newDate);
        });

        it ("should have the specified completed status", function () {
            task.markAsDone();
            expect(task.isCompleted()).toBeTruthy();
        });

        it ("should have the name specified as parameter", function () {
            var newName = "new name";
            task.setName(newName);
            expect(task.getName()).toEqual(newName);
        });
    });

    describe ("when one is reset", function () {
        it ("should not be marked as done", function () {
            task.resetDoneStatus();
            expect(task.isCompleted()).toBeFalsy();
        });
    });
});

