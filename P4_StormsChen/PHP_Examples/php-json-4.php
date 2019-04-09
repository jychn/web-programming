<?php
$string = '{"foo": "bar", "cool": "attr"}';
//  Note, result is a stdObject unless we pass "true" to json_decode()
//  Then result is an array!

$result = json_decode($string, true);

// Result: object(stdClass)#1 (2) { ["foo"]=> string(3) "bar" ["cool"]=> string(4) "attr" }
var_dump($result);

// Prints "bar"
echo "<p>";
echo $result['foo'];

// Prints "attr"
echo "<p>";
echo $result['cool'];

echo "<p>";
echo "Lets change foo:<p>";
$result['foo'] = "paul";

var_dump($result);

// prints "paul"

echo "<p>";
echo $result['foo'];

?>
