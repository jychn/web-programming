<?php

if (php_sapi_name() == "cli") {
    $newline = "\n";
} else {
    $newline = "<br>";
}
$string = '{"foo": "bar", "cool": "attr"}';
//  Note, result is a stdObject unless we pass "true" to json_decode()
//  Then result is an array!

$result = json_decode($string, true);
var_dump($result);
$count = 0;

// List out each key/value pair, keep count as we go.
// count() function would give us a total count if thats all we needed, btw.
print "$newline";
foreach ($result as $key => $value) {
	$count++;
	echo $count;
	echo ") $key = $value $newline";
}

print $newline;
$justkeys = array_keys($result);
echo "-----\n";
var_dump($justkeys);

// -------------------------------------------
// A different approach - objects vs. arrays.  Note the second parameter to
// json_decode().

$result2 = json_decode($string, false);
var_dump($result2);

$count = 0;
print $newline;
foreach ($result2 as $key => $value) {
	$count++;
	echo $count;
	echo ") $key = $value";
	print $newline;
}

?>
