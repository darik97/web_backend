<?php
/**
 * Created by PhpStorm.
 * User: Daria
 * Date: 06.11.2017
 * Time: 21:57
 */

class menuController extends Controller
{

    public function index()
    {
        $menu = $this->model->load();
        $this->setResponse($menu);
    }

}