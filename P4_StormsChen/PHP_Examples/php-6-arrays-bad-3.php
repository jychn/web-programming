<?php
// numeric index example
$array1 = array(
	"blue", "red", "purple", "yellow", "pink", "indigo"
	);

do_important_things("first");

print "$array1[0]<br>\n"; // indices start at 0.....

print "$array1[4]<br>\n"; // the fifth element, pink

// one way to loop through an array.....

print "<br>Looping.....<br>\n";

for ($i = 0 ; $i < count($array1) ; $i++) {
	print $array1[$i]."<br>\n";
}

print "Done looping......<br>\n";

print "Bad variable, produces a notice (still bad!!)<br>\n";
print $array[10000]."<br>\n";

print "Bad index, produces a notice (VERY bad!!)<br>\n";
print $array1[10000]."<br>\n";

if ($array1[10000] == "keepallfiles") {
	print "Keeping all files<br>";
} else {
	print "Deleting all files.....<br>";
}

print "Run-time warning, produces a warning !!!<br>\n";
print 1/0;

print "Run-time error, produces a run-time crash!!!!!!<br>\n";

does_not_exist();

do_important_things("second");
print "End of the line!<br>";
exit;


function do_important_things($times) {
	print "Done doing important things for the ".$times." time!<br>";
	return;
}
?>
