function solve() {
    var a = parseFloat(document.getElementById("a").value);
    var b = parseFloat(document.getElementById("b").value);
    var c = parseFloat(document.getElementById("c").value);
    var result = document.getElementById("result");

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        result.value = "Please enter numbers";
        return;
    }

    if (a === 0) {
        if (b === 0) {
            result.value = c === 0 ? "Infinite solutions" : "No solution";
        } else {
            result.value = "x = " + (-c / b);
        }
    } else {
        var delta = b * b - 4 * a * c;
        if (delta < 0) {
            result.value = "No real roots";
        } else if (delta === 0) {
            var x = -b / (2 * a);
            result.value = "x1 = x2 = " + x;
        } else {
            var x1 = (-b + Math.sqrt(delta)) / (2 * a);
            var x2 = (-b - Math.sqrt(delta)) / (2 * a);
            result.value = "x1 = " + x1 + " ; x2 = " + x2;
        }
    }
}

function clearForm() {
    document.getElementById("a").value = "";
    document.getElementById("b").value = "";
    document.getElementById("c").value = "";
    document.getElementById("result").value = "";
}
