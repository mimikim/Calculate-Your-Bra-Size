// namespace object
var bra_calculator = bra_calculator || (function () {

    var inputs = document.getElementsByTagName('input'),
        ribs_input = document.getElementById('rib-measurement'),
        bust_input = document.getElementById('bust-measurement'),
        validation_flag = false,
        results_div = document.getElementById('bra-results');

    function results_message(message) {
        results_div.innerHTML = message;
    }

    function find_sibling(input) {
        return input.nextSibling.nextSibling;
    }

    function add_error(input) {
        input.classList.add('error');
        find_sibling(input).classList.add('show');
    }

    function remove_error(input) {
        input.classList.remove('error');
        find_sibling(input).classList.remove('show');
    }

    function error_checker(input) {
        if (input.value == 0) {
            add_error(input);
        } else {
            if (input.type.toLowerCase() === 'number') {
                remove_error(input);
            }
        }
    }

    function validator() {
        // check for empty values
        for (i = 0; i < inputs.length; ++i) {
            error_checker(inputs[i]);
        }

        // rib measurement should be be >= 24
        if (ribs_input.value < 24) {
            add_error(ribs_input);
        } else {
            remove_error(ribs_input);
        }

        // bust should be at least 1 inch greater than ribs!
        if ( bust_input.value !== '' && ribs_input.value !== '' ) {
            if (Number(bust_input.value) <= Number(ribs_input.value)) {
                add_error(bust_input);
            } else {
                remove_error(bust_input);
            }
        }

        if ( !ribs_input.classList.contains('error') && !bust_input.classList.contains('error') ) {
            validation_flag = true;
        } else {
            validation_flag = false;
            results_message('');
        }

        if ( validation_flag ) {
            var cup_sizes = ['A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H', 'HH', 'J', 'JJ', 'K', 'KK', 'L', 'LL', 'M', 'MM', 'N', 'O', 'OO'],
                bust = Math.ceil(bust_input.value),
                ribs =  Math.ceil(ribs_input.value),
                difference = ( bust - ribs ) - 1;

            if ( cup_sizes[difference] === null ) {
                results_message('Your size is out-of-range! Please try again.');
            } else {
                results_message('Your Calculated Size is: <span>' + ribs + cup_sizes[difference] + '</span>');
            }
        }
    }

    return {
        validator: validator
    }
})();

(function () {
    document.getElementById('bra-calculator').addEventListener('submit', function (e) {
        e.preventDefault();
        bra_calculator.validator();
    });
})();

