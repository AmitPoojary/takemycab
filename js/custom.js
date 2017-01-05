$(document).ready(function () {
    var today = new Date();
    var dd = today.getDate();
    var mmm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mmm < 10) {
        mmm = '0' + mmm
    }

    today = dd + '-' + mmm + '-' + yyyy;
    $('input[name="Date"]').daterangepicker({
        timePicker: true,
        singleDatePicker: true,
        minDate: today,
        locale: {
            format: 'DD-MMM-YYYY h:mm A'
        }
    },
        function (start, end, label) {
            var years = moment().diff(start, 'years');
            // alert("You are " + years + " years old.");
        });

    $("#airport").click(function () {
        $("#airport_fares").show();
        $("#hourly_fares").hide();
        $("#outstation_fares").hide();
        $("#tirupathi_fares").hide();

        $("#ride_hourly").hide();
        $("#ride_outstation").hide();
        $(".ride_tirupathi").hide();
        $("#ride_airport").show();
    });

    $("#hourly").click(function () {
        $("#airport_fares").hide();
        $("#hourly_fares").show();
        $("#outstation_fares").hide();
        $("#tirupathi_fares").hide();

        $("#ride_hourly").show();
        $("#ride_outstation").hide();
        $(".ride_tirupathi").hide();
        $("#ride_airport").hide();
    });
    $("#outstation").click(function () {
        $("#airport_fares").hide();
        $("#hourly_fares").hide();
        $("#outstation_fares").show();
        $("#tirupathi_fares").hide();

        $("#ride_hourly").hide();
        $("#ride_outstation").show();
        $(".ride_tirupathi").hide();
        $("#ride_airport").hide();
    });
    $("#tirupathi").click(function () {
        $("#airport_fares").hide();
        $("#hourly_fares").hide();
        $("#outstation_fares").hide();
        $("#tirupathi_fares").show();

        $("#ride_hourly").hide();
        $("#ride_outstation").hide();
        $(".ride_tirupathi").show();
        $("#ride_airport").hide();
    });

    $("#tirupathi_non_ac").click(function () {
        $("#tirupathi_ac_fares").hide();
        $("#tirupathi_non_ac_fares").show();
    });
    $("#tirupathi_ac").click(function () {
        $("#tirupathi_ac_fares").show();
        $("#tirupathi_non_ac_fares").hide();
    });

    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("#booking").submit(function (event) {

        if ($("#name").val() == "" || $("#phone").val() == "" || $("#email").val() == "" || $("#address").val() == "") {
            alert("Incomplete Details")
            
        } else {
            // Abort any pending request
            if (request) {
                request.abort();
            }
            // setup some local variables
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");
            console.log("$inputs", $inputs);
            // Serialize the data in the form
            var serializedData = $form.serialize();
            console.log("serializedData", serializedData);
            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            request = $.ajax({
                url: "https://script.google.com/macros/s/AKfycbzOSTdXmt0hM59SelRzg-_qL0pJWKW3w4aQpaR5XWDP9H0sbrTf/exec",
                type: "post",
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR) {
                // Log a message to the console
                console.log("Hooray, it worked!");
                console.log(response);
                console.log(textStatus);
                console.log(jqXHR);
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                // Log the error to the console
                console.error(
                    "The following error occurred: " +
                    textStatus, errorThrown
                );
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            });

            // Prevent default posting of form
            event.preventDefault();
            // When the user clicks the button, open the modal 
            modal.style.display = "block";
            //window.open('mailto:amit.poojary.15@gmail.com?subject=subject&body=body');
        }

    });
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var okay = document.getElementsByClassName("okay")[0];


    

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
okay.onclick = function(event) {
    modal.style.display = "none";
    document.getElementById("booking").reset();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
});
