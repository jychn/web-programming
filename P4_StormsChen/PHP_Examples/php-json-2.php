<?php
$string = '{"foo": "bar", "cool": "attr"}';
$string2 = "{\"foo\": \"bar\", \"cool\": \"attr\"}";
$result = json_decode($string);

// Result: object(stdClass)#1 (2) { ["foo"]=> string(3) "bar" ["cool"]=> string(4) "attr" }
var_dump($result);

// Prints "bar"
echo "<p>";
echo $result->foo;

// Prints "attr"
echo "<p>";
echo $result->cool;
echo "<p>";
?>
