function enterData() {
    var input = document.getElementById("inputData").value;
    document.getElementById("result").value = input;
}

function countUppercase() {
    var text = document.getElementById("inputData").value;
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] >= "A" && text[i] <= "Z") count++;
    }
    document.getElementById("result").value = "Uppercase letters: " + count;
}

function toUpper() {
    var text = document.getElementById("inputData").value;
    document.getElementById("result").value = text.toUpperCase();
}

function toLower() {
    var text = document.getElementById("inputData").value;
    document.getElementById("result").value = text.toLowerCase();
}

function oneWordPerLine() {
    var text = document.getElementById("inputData").value;
    var words = text.split(" ");
    document.getElementById("result").value = words.join("\n");
}

function wordCount() {
    var text = document.getElementById("inputData").value.trim();
    if (text === "") {
        document.getElementById("result").value = "Word count: 0";
        return;
    }
    var words = text.split(/\s+/);
    document.getElementById("result").value = "Word count: " + words.length;
}

function countLowercase() {
    var text = document.getElementById("inputData").value;
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] >= "a" && text[i] <= "z") count++;
    }
    document.getElementById("result").value = "Lowercase letters: " + count;
}

function printVowelsConsonants() {
    var text = document.getElementById("inputData").value.toLowerCase();
    var vowels = 0, consonants = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch >= "a" && ch <= "z") {
            if ("aeiou".includes(ch)) vowels++;
            else consonants++;
        }
    }
    document.getElementById("result").value = "Vowels: " + vowels + ", Consonants: " + consonants;
}
