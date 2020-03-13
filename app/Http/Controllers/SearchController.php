<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Search;
use DataTables;

class SearchController extends Controller
{
    function index() {
        return view('search');
    }

    function action(Request $request)
    {
     if($request->ajax())
     {
      $data = Search::search($request->get('search_text'))->get();

      return response()->json($data);
     }
    }

    function normal_search(Request $request)
    {
        if($request->ajax())
        {
            $data = Search::latest()->get();
            return Datatables::of($data)->make(true);
        }
      
        return view('normal_search');
    }
}
