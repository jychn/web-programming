
<?php
error_reporting(E_ALL);

$gamesstring = file_get_contents("http://www.cs.uky.edu/~paul/public/Games.json");

$games = json_decode($gamesstring, true);
//need label list
//need searchables list
$label_list = [];
$searchables_list = [];
foreach($games as $key => $value){
  foreach($value as $element){
    foreach($element as $ele_key => $ele_value){
      //echo "$ele_key: ";
      if ($ele_key == "label"){
        array_push($label_list, $ele_key);
      }
      if (is_array($ele_value)){
        foreach($ele_value as $elements){
          array_push($searchables_list, $elements);
          //echo "$elements ";
        }
        //echo "\n";
      }
      else{
      //  echo "$ele_value\n";
      }
    }
    //echo "\n";
  }
}
array_unique($searchables_list);
array_unique($label_list);

?>