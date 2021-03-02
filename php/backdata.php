<?php
header('Access-Control-Allow-Origin:*');
header('content-type:application/json;charset=utf-8');
echo file_get_contents('data.json');
