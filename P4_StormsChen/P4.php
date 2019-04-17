<head>
<body>
    <h1>The Terran-based Game Database</h1>
    <h2>Project 4A by William Storms and Jacob Chen</h2>
<?php

// Error reporting
error_reporting(E_ALL);

// Display default form if criteria is not yet entered
if (isset($_GET['criteria'])) { // After report
    processForm();
}
else { // Before report
    displayForm();
}


function openJSON($url) {
/*
    Function opens JSON file and outputs error on failure.
*/
    $jsonString = file_get_contents($url);
    $jsonDict = json_decode($jsonString, true);

    // If there is an error, output to page
    if (json_last_error() != 0 || $jsonString == false) {
        echo "<h2>Error detecting JSON file.</h2>";
    }
    else {
        return $jsonDict;
    }
}

function processForm() {
/*
    Function that processes input and searches "database" for entries based on
    input from form. List all comments for the chosen platform and lists
    each title matching the search critera.
*/

    // Open the Games.json file
    $platformsDict = openJSON("http://www.cs.uky.edu/~paul/public/Games.json");

    // Obtain search form values
    $whichPlatform = $_GET['whichPlatform'];
    $searchField = $_GET['searchField'];
    $criteria = $_GET['criteria'];

    // Search for and save JSON url based on desired platform
    $url = "";
    foreach ($platformsDict["platforms"] as $platform) {
        if ($platform["label"] == $whichPlatform) {
            $url = $platform["url"];
        }
    }
    $platformInfo = openJSON($url);

    // Message describing search input to user
    echo "<h3>Searching for $whichPlatform titles with $searchField as \"$criteria\":</h3>";

    // Counter for number of entries detected
    $numTitles = 0;

    // Nested foreach()'s to parse through sub-JSON structures
    // For a specific platform's fields (comments, titles, etc.)
    foreach ($platformInfo as $platformField) {
        // For each field's objects
        foreach ($platformField as $fieldInfo) {
            // If the objest is a string (comment), output it
            if (is_string($fieldInfo)) {
                echo "$fieldInfo<br>";
            }

            // Otherwise, it must be an array
            // If criteria is "", output all objects in array and highlight field
            elseif ($criteria == "") {
                foreach ($fieldInfo as $titleField => $titleFieldValue) {
                    if ($titleField == $searchField) {
                        echo "<mark>$titleField: $titleFieldValue</mark><br>";
                        $numTitles++;
                    }
                    else {
                        echo "$titleField: $titleFieldValue<br>";
                    }
                }
                echo "<br>";
            }
            // Else, output all objects with field values matching criteria
            // and highlight those field/value pairs
            elseif ($fieldInfo[$searchField] == $criteria) {
                foreach ($fieldInfo as $titleField => $titleFieldValue) {
                    if ($titleFieldValue == $criteria) {
                        echo "<mark>$titleField: $titleFieldValue</mark><br>";
                        $numTitles++;
                    }
                    else {
                        echo "$titleField: $titleFieldValue<br>";
                    }
                }
                echo "<br>";
            }
        }
        echo "<br>";
    }

    // Output message corresponding to number of titles found.
    echo "<h3>Found $numTitles matching entries.</h3>";
}

function displayForm() {
/*
    Function that processes JSON files to create possible search fields.
*/

    // Open the Games.json file
    $platformsDict = openJSON("http://www.cs.uky.edu/~paul/public/Games.json");

    // Initialize lists for storing search fields
    $labelList = [];
    $searchableList = [];

    // Parse platforms for possible search fields, and append them to lists/
    foreach ($platformsDict["platforms"] as $platform) {
        foreach ($platform as $field => $value) {
            if ($field == "label") {
                array_push($labelList, $value);
            }
            elseif ($field == "searchable") {
                foreach($value as $searchable) {
                    array_push($searchableList, $searchable);
                }
            }
        }
    }

    // Eliminate duplicate fields
    $labelList = array_unique($labelList);
    $searchableList = array_unique($searchableList);

    // Create search form using html
    ?>
    <form action="P4.php" method="GET">
        <b>Select Platform:</b><br>
        <select name = "whichPlatform">
            <?php
            // Create drop-down menu for platform
            foreach($labelList as $platformSelection){
                echo "<option value='$platformSelection'>$platformSelection</option>";
            }
            ?>
        </select>
        <br>
        <b>Select Field:</b><br>
        <select name = "searchField">
            <?php
            // Create drop-down menu for field
            foreach($searchableList as $fieldSelection){
                echo "<option value='$fieldSelection'>$fieldSelection</option>";
            }
            ?>
        </select>
        <br>
        <b>Search for:<b><br>
        <input type="text" name="criteria">
        <br>
        <input type="submit" name="submit" value="Report">
    </form>
    <?php
}
?>
</body>
</html>