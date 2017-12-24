<?php

/**
 * Created by PhpStorm.
 * User: Daria
 * Date: 17.10.2017
 * Time: 18:12
 */
class Main
{
    public static $pages = array(
        1 => array('title' => 'Start', 'link' => 'start.html'),
        2 => array('title' => 'About', 'link' => 'about.html'),
        3 => array('title' => 'Top List', 'link' => 'top.html')
    );

    public static function getPage($page_number = 1)
    {
        return (include('assets/' . self::$pages[$page_number]['link']));
    }

    public static function getMenu($item_number = 1)
    {
        $result = '';
        foreach (self::$pages as $i => $value) {
            $item_name = $value['title'];
            if ($i == $item_number) {
                $result .= '<li class="header__item header__item-active">' . $item_name . '</li>';
            } else {
                $result .= '<a href="index.php?page=' . $i . '"><li class="header__item">' . $item_name . '</li></a>';
            }
        }
        return $result;
    }

}