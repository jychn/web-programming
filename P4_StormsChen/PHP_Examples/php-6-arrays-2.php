<?php
$array1 = array(
    "color" => "red",
	"font" => "courier",
	);

// as of PHP 5.4
$array2 = [
	"color" => "blue",
	"font" => "times",
	];

// I want the color:
$what = "color";

$answer = $array1[$what];

echo "The $what in array1 is $answer<br>";

// I want the font:
$what = "font";
$answer2 = $array2[$what];

echo "The $what in array2 is $answer2<br>";
?>











