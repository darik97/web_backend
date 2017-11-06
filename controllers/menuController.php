<?php
/**
 * Created by PhpStorm.
 * User: Daria
 * Date: 06.11.2017
 * Time: 21:57
 */

class menuController extends Controller {

    public function index(){
        $examples=$this->model->load();
        $this->setResponce($examples);
    }

}