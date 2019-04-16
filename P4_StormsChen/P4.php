<?php

error_reporting(E_ALL);

if (isset($_GET['criteria'])){ //after submit
  process_form();
}
else{ //before submit
  display_form();
  $url_list = parse_php()[0];
}

function process_form(){
  $whichPlatform = $_GET['whichPlatform'];
  $searchField = $_GET['searchField'];
  $criteria = $_GET['criteria'];

  $label_list = parse_php()[1];
  $url_list = parse_php()[0];


  $label_index = array_search($whichPlatform, $label_list);
  $url = $url_list[$label_index];

  $info_string = file_get_contents($url);

  $info_json = json_decode($info_string, true);


  foreach($info_json["titles"] as $title){
    if($title[$searchField] == $criteria){
      foreach($title as $field => $value) {
        echo "
          <html>
            <body>";
        if ($value == $criteria) {
            echo "<b>$field: $value</b><br>" // Add highlighting 
        }
        else {
            echo "$field: $value<br>";
        }
      }
    }
    echo "<br>";
  }
  echo "</body>
        </html>";
}

function display_form(){

  $label_list = parse_php()[1];
  $searchables_list = parse_php()[2];
  foreach($searchables_list as $item){
    #echo "$item ";
  }
  #echo "\n";
  foreach($label_list as $item){
    #echo "$item ";
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
<?php
}

function parse_php(){
  $gamesstring = file_get_contents("http://www.cs.uky.edu/~paul/public/Games.json");
  $games = json_decode($gamesstring, true);
  $label_list = [];
  $searchables_list = [];
  $url_list = [];
  foreach($games as $key => $value){
    foreach($value as $element){
      foreach($element as $ele_key => $ele_value){
        if ($ele_key == "url"){
          array_push($url_list, $ele_value);
        }
        if ($ele_key == "label"){
          array_push($label_list, $ele_value);
        }
        if (is_array($ele_value)){
          foreach($ele_value as $elements){
            array_push($searchables_list, $elements);
          }
          echo "\n";
        }
      }
    }
  }
  $label_list = array_unique($label_list);
  $searchables_list = array_unique($searchables_list);
  $url_list = array_unique($url_list);
  //return 3 arrays, url_list, label_list, and searchables_list

  $return_array = array($url_list, $label_list, $searchables_list);
  return $return_array;
}

?>
