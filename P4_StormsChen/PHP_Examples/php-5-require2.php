<?php

require("php-5-html.php");
require("php-5-menus.php");
require("php-5-database.php");

do_html_start();

do_menu();

echo "<p><p>";

someLookup();

do_html_end();
?>
