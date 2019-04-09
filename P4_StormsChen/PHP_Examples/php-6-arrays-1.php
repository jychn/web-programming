<?php
$array1 = array(
    "foo" => "bar",
	"bar" => "foo",
	);

// as of PHP 5.4
$array2 = [
	"foo" => "bar",
	"bar" => "foo",
	];

// "array"
echo "HERE1 ($array1) HERE2<br>";
// error
// echo "$array1['foo']<br>";
echo $array1['foo']."<br>";

echo $array2['bar']."<br>";

$aval = $array2['foo'];

echo "The value is $aval<br>";
?>
