<?php
  header('Access-Control-Allow-Origin:*');
  header('content-type:application/json;charset=utf-8');
  $jsonString = file_get_contents('data/goods.json');
  echo $jsonString;
?>