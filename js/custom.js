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
        
        $.fn.removeAllErrors();
        
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
        $.fn.removeAllErrors();
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

        $.fn.removeAllErrors();
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

         $.fn.removeAllErrors();
    });

    $("#tirupathi_non_ac").click(function () {
        $("#tirupathi_ac_fares").hide();
        $("#tirupathi_non_ac_fares").show();

         $.fn.removeAllErrors();
    });
    $("#tirupathi_ac").click(function () {
        $("#tirupathi_ac_fares").show();
        $("#tirupathi_non_ac_fares").hide();

         $.fn.removeAllErrors();
    });

    $.fn.removeAllErrors = function() {
        $("#name").removeClass("error");
        $("#phone").removeClass("error");
        $("#email").removeClass("error");
        $("#address").removeClass("error");
        $("#ride_airport").removeClass("error");
        $("#ride_hourly").removeClass("error");
        $("#ride_outstation").removeClass("error");
        $("#ride_tirupathi_ac_non").removeClass("error");
        $("#ride_tirupathi_package").removeClass("error");
        $("#error-message").addClass("error-message");
    };
    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("#booking").submit(function (event) {
            debugger;
        if ($("#name").val() == "" || validatePhone(numberCheck) == false || validateEmail()==false || $("#address").val() == "" 
                    || $("#ride_airport").val() == null && $("#ride_hourly").val() == null && $("#ride_outstation").val() == null
                    && $("#ride_tirupathi_ac_non").val() == null && $("#ride_tirupathi_package").val() == null) {
            if($("#name").val() == ""){
                $("#name").addClass("error");
            }else{
                $("#name").removeClass("error");  
            }
            if($("#phone").val() == ""){
                $("#phone").addClass("error");
            }
            if($("#email").val() == ""){
                $("#email").addClass("error");
            }
            if($("#address").val() == ""){
                $("#address").addClass("error");
            }else{
                $("#address").removeClass("error");
            }
            if($("#ride_airport").val() == null){
                $("#ride_airport").addClass("error");
            }else{
                $("#ride_airport").removeClass("error");
            }
            if($("#ride_hourly").val() == null){
                $("#ride_hourly").addClass("error");
            }else{
                $("#ride_hourly").removeClass("error");
            }
            if($("#ride_outstation").val() == null){
                $("#ride_outstation").addClass("error");
            }else{
                $("#ride_outstation").removeClass("error");
            }
            if($("#ride_tirupathi_ac_non").val() == null){
                $("#ride_tirupathi_ac_non").addClass("error");
            }else{
                $("#ride_tirupathi_ac_non").removeClass("error");
            }
            if($("#ride_tirupathi_package").val() == null){
                $("#ride_tirupathi_package").addClass("error");
            }else{
                $("#ride_tirupathi_package").removeClass("error");
            }
           
            $("#error-message").removeClass("error-message");
            event.preventDefault();
            
            
        } else {
            console.log("validateEmail()", validateEmail());
            // Abort any pending request
            $.fn.removeAllErrors();
            if (request) {
                request.abort();
            }
            // setup some local variables
            var $form = $(this);
            console.log("$form", $form);
            
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
                url: "https://script.google.com/macros/s/AKfycbzhKtmAtCljqDU655jBjyJHkKafE4W1RzQ4hMjdd32db3fxnUCx/exec",
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
            $("#error-message").addClass("error-message");
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
     document.getElementById("booking").reset();
}
okay.onclick = function(event) {
    modal.style.display = "none";
    var dateValue = document.getElementById("date").value;
    console.log("dateValue", dateValue);
    document.getElementById("booking").reset();
    document.getElementById("date").setAttribute('value', dateValue);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

});
function validateEmail() {
    var x = document.getElementById("email").value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        $("#valid-email").show();
        $("#email").addClass("error");
        return false;
    }else{
        $("#valid-email").hide();
        $("#email").removeClass("error");
    }
}
var numberCheck;
function validatePhone(el) {
    debugger;
     numberCheck = el;
  if (el.value.length != 10) {
     $("#valid-phone").show();
        $("#phone").addClass("error");
        return false;
  }else{
      $("#valid-phone").hide();
        $("#phone").removeClass("error");
  }
}