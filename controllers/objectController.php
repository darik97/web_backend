<?php
/**
 * Created by PhpStorm.
 * User: Daria
 * Date: 06.11.2017
 * Time: 22:27
 */

class objectController extends Controller
{

    public function index()
    {
        $objects = $this->model->load();
        $this->setResponse($objects);
    }

    public function view($data)
    {
        $object = $this->model->load($data['id']);
        $this->setResponse($object);
    }

    public function add()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);

        if (isset($_POST['id'])
            && isset($_POST['name'])
            && isset($_POST['image'])
            && isset($_POST['power'])
            && isset($_POST['speed'])) {
            $dataToSave = array(
                'id' => $_POST['id'],
                'name' => $_POST['name'],
                'image' => $_POST['image'],
                'power' => $_POST['power'],
                'speed' => $_POST['speed']
            );
            $addedObject = $this->model->create($dataToSave);
            $this->setResponse($addedObject);
        }

    }

    public function edit($data)
    {
        $_PUT = json_decode(file_get_contents('php://input'), true);

        if (isset($_PUT['id'])
            && isset($_PUT['name'])
            && isset($_PUT['image'])
            && isset($_PUT['power'])
            && isset($_PUT['speed'])) {
            $dataToEdit = array(
                'id' => $_PUT['id'],
                'name' => $_PUT['name'],
                'image' => $_PUT['image'],
                'power' => $_PUT['power'],
                'speed' => $_PUT['speed']
            );
            $editedObject = $this->model->save($data['id'], $dataToEdit);
            $this->setResponse($editedObject);
        }
    }

    public function delete($data)
    {
        $deletedObject = $this->model->delete($data['id']);
        $this->setResponse($deletedObject);
    }

}