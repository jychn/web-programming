<?php

function end_html() {

echo "
</body>
</html>
";
}

if (isset($_GET['value1'])) {
	process_form();
} else {
	display_form();
}


function process_form() {

start_html();

// You need to validate the input!!!!

$val1 = $_GET['value1'];
$val2 = $_GET['value2'];

$sum = $val1 + $val2;

echo "The sum is ", $sum;

end_html();


}

function display_form() {

start_html();
?>
<form action="php-7-html-part2.php" method="get">
	First Number:
	<input type='number' name='value1'><br><br>
	Second Number:
	<input type='number' name='value2'><br><br>
	<input type='submit' value='Please add'>
</form>

<?php
end_html();
}

function start_html() {

echo "
<html>
<head>
<title>Add 2 numbers!</title>
</head>
<body>
<h1>Add 2 Numbers!</h1>
";

}


?>
