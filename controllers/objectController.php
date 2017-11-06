<?php
/**
 * Created by PhpStorm.
 * User: Daria
 * Date: 06.11.2017
 * Time: 22:27
 */

class objectController extends Controller {

    public function index(){
        $objects=$this->model->load();
        $this->setResponce($objects);
    }

    public function view($data){
        $object=$this->model->load($data['id']);
        $this->setResponce($object);
    }

    public function add(){
        $_POST=json_decode(file_get_contents('php://input'),true);

        if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['score'])){
            $dataToSave=array('id'=>$_POST['id'], 'name'=>$_POST['name'], 'score'=>$_POST['score']);
            $addedObject=$this->model->create($dataToSave);
            $this->setResponce($addedObject);
        }
    }

    public function edit($data){
        $_PUT=json_decode(file_get_contents('php://input'),true);

        if(isset($_PUT['id']) && isset($_PUT['name']) && isset($_PUT['score'])) {
            $dataToEdit = array('id' => $_PUT['id'], 'name' => $_PUT['name'], 'score' => $_PUT['score']);
            $editedObject = $this->model->save($data['id'], $dataToEdit);
            $this->setResponce($editedObject);
        }
    }

    public function delete($data) {
        $deletedObject = $this->model->delete($data['id']);
        $this->setResponce($deletedObject);
    }

}