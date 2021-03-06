var app = app || {};

app.userController = (function() {
    function UserController(model) {
        this._model = model;
    }

    UserController.prototype.addUser = function (username, password) {
        var user = {
            username: username,
            password: password
        };

        this._model.addUser(user)
            .then(function (data) {
                user["sessionToken"] = data.sessionToken;
                sessionStorage.setItem("logged-in", JSON.stringify(user));
            }, function (error) {
                console.log(error.responseText);
            })
    };

    UserController.prototype.loginUser = function (username, password) {
        var user = {
            username: username,
            password: password
        };
        this._model.loginUser(username, password)
            .then(function (data) {
                user["sessionToken"] = data.sessionToken;
                sessionStorage.setItem("logged-in", JSON.stringify(user));
            }, function (error) {
                console.log(error.responseText);
            })
    };



    return {
        load: function (model) {
            return new UserController(model);
        }
    }
}());