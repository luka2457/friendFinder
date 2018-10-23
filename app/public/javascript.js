$(document).ready(function () {
    //hides modal until called when form sumbitted
    $("#results-modal").modal("hide");

    // data to api route
    var bestMatch = [];
    var userInfo = [];

    // functions
    // captures data from form
    function submitForm() {
        event.preventDefault();

        // Form validation
        function validateForm() {
            var isValid = true;
            $(".form-control").each(function () {
                if ($(this).val() === "") {
                    isValid = false;
                }
            });

            $(".chosen-select").each(function () {

                if ($(this).val() === "") {
                    isValid = false;
                }
            });
            return isValid;
        }

        // If all required fields are filled 
        if (validateForm()) {
            // User's object data
            var userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };

            $.post("/api/friends", userData, function (data) {
                console.log("userData added successfuly");
                console.log("Best Friend: " + data.name);
                console.log("User Name: " + userData.name);
                console.log("---------------------------------");
                // push data and user data into global variables
                bestMatch.push(data);
                userInfo.push(userData);
                // adds best friend info to modal
                addInfo();
            });
            // Show the modal
            $("#results-modal").modal("toggle");
            //calls clear arrays function
            clearArrays();
        } else {
            alert("Please fill out all fields before submitting!", 4000);
        }
    }

    // add's user and closest match data to modal
    function addInfo() {
        $("#match-name").text(bestMatch[0].name);
        $("#match-img").attr("src", bestMatch[0].photo);
    }

    //so there can be another user input with new object data
    function clearArrays() {
        bestMatch = [];
        userInfo = [];
    }
    //initial form submit...calls to the remaining functions
    $("#submit").on("click", submitForm);
});
















































    // // Chosen CSS
    // var config = {
    //   ".chosen-select": {},
    //   ".chosen-select-deselect": {
    //     allow_single_deselect: true
    //   },
    //   ".chosen-select-no-single": {
    //     disable_search_threshold: 10
    //   },
    //   ".chosen-select-no-results": {
    //     no_results_text: "Oops, nothing found!"
    //   },
    //   ".chosen-select-width": {
    //     width: "95%"
    //   }
    // };

    // for (var selector in config) {
    //   $(selector).chosen(config[selector]);
    // }

    // // Capture the form inputs
    // $("#submit").on("click", function(event) {
    //   event.preventDefault();

    //   // Form validation
    //   function validateForm() {
    //     var isValid = true;
    //     $(".form-control").each(function() {
    //       if ($(this).val() === "") {
    //         isValid = false;
    //       }
    //     });

    //     $(".chosen-select").each(function() {

    //       if ($(this).val() === "") {
    //         isValid = false;
    //       }
    //     });
    //     return isValid;
    //   }

    //   // If all required fields are filled
    //   if (validateForm()) {
    //     // Create an object for the user"s data
    //     var userData = {
    //       name: $("#name").val(),
    //       photo: $("#photo").val(),
    //       scores: [
    //         $("#q1").val(),
    //         $("#q2").val(),
    //         $("#q3").val(),
    //         $("#q4").val(),
    //         $("#q5").val(),
    //         $("#q6").val(),
    //         $("#q7").val(),
    //         $("#q8").val(),
    //         $("#q9").val(),
    //         $("#q10").val()
    //       ]
    //     };

    //     // AJAX post the data to the friends API.
    //     $.post("/../data/friends", userData, function(data) {

    //       // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    //       $("#match-name").text(data.name);
    //       $("#match-img").attr("src", data.photo);

    //       // Show the modal with the best match
    //       $("#results-modal").modal("toggle");

    //     });
    //   } else {
    //     alert("Please fill out all fields before submitting!");
    //   }
    // });
