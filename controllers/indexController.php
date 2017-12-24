<?php

class indexController extends Controller
{

    public function index()
    {
        $message = file_get_contents('/assets/index.html', true);
        $this->setResponse($message);
    }

}