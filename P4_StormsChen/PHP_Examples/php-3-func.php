<?php

do_header();

echo "Here is the system date: <p>";
do_systemdate();

do_footer();


function do_systemdate() {

	system("/bin/date");

}


function do_header() {

echo "
<html>
<title> PHP example 3 </title>
<body>
";
}


function do_footer() {

echo "
</body>
</html>
";
}

?>
