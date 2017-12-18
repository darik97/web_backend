<?php
/**
 * Created by PhpStorm.
 * User: Daria
 * Date: 06.11.2017
 * Time: 21:59
 */

class userController extends Controller
{

    public function index()
    {
        $users = $this->model->load();
        $this->setResponse($users);
    }

    public function view($data)
    {
        $user = $this->model->load($data['id']);
        $this->setResponse($user);
    }

    public function add()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);

        if (isset($_POST['id'])
            && isset($_POST['name'])
            && isset($_POST['score'])) {
            $dataToSave = array(
                'id' => $_POST['id'],
                'name' => $_POST['name'],
                'score' => $_POST['score']
            );
            $addedUser = $this->model->create($dataToSave);
            $this->setResponse($addedUser);
        }
    }

    public function edit($data)
    {
        $_PUT = json_decode(file_get_contents('php://input'), true);

        if (isset($_PUT['id'])
            && isset($_PUT['name'])
            && isset($_PUT['score'])) {
            $dataToEdit = array(
                'id' => $_PUT['id'],
                'name' => $_PUT['name'],
                'score' => $_PUT['score']
            );
            $editedUser = $this->model->save($data['id'], $dataToEdit);
            $this->setResponse($editedUser);
        }
    }

    public function delete($data)
    {
        $deletedUser = $this->model->delete($data['id']);
        $this->setResponse($deletedUser);
    }

}