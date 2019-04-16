<?php

if (isset($_GET['criteria'])){
  process_form();
}
function process_form(){
  $val1 = $_GET['criteria'];
  echo "$val1";
}
error_reporting(E_ALL);

$gamesstring = file_get_contents("http://www.cs.uky.edu/~paul/public/Games.json");

$games = json_decode($gamesstring, true);
//need label list
//need searchables list
$label_list = [];
$searchables_list = [];
$url_list = [];
foreach($games as $key => $value){
  foreach($value as $element){
    foreach($element as $ele_key => $ele_value){
      #echo "$ele_key: ";
      if ($ele_key == "url"){
        array_push($url_list, $ele_value);
      }
      if ($ele_key == "label"){
        array_push($label_list, $ele_value);
      }
      if (is_array($ele_value)){
        foreach($ele_value as $elements){
          array_push($searchables_list, $elements);
          #echo "$elements ";
        }
        echo "\n";
      }
      else{
        #echo "$ele_value\n";
      }
    }
    //echo "\n";
  }
}

//echo "\n";
$searchables_list = array_unique($searchables_list);
$label_list = array_unique($label_list);
foreach($searchables_list as $item){
  //echo "$item ";
}
//echo "\n";
foreach($label_list as $item){
  //echo "$item ";
}


?>
<html>
  <body>
    <form action="P4.php" method="GET">
      <select name = "whichPlatform">
        <?php
        $index = 0;
        foreach($label_list as $item){
          echo "<option value = '$item'>$item</option>";
          $index++;
        }
        ?>
      </select>
      <br>
      <select name = "searchField">
        <?php
        $index = 0;
        foreach($searchables_list as $item){
          echo "<option value = '$item'>$item</option>";
          $index++;
        }
        ?>
      </select>
      <br>
      <input type="text" name = "criteria">
      <br>
      <input type="submit" name = "submit" value= "Submit">
    </form>
  </body>
</html>
