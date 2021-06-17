<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Repositories\CustomerRepository;

class CustomerController extends Controller
{
    // public function index()
    // {
    //     $customer = Customer::all();        

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Customer List',
    //         'data'    => $customer
    //     ]);
    // }

    public $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    /**
     * index() Get all customer list
     * 
     * @return response
     */
    public function index()
    {
        $customers = $this->customerRepository->getAll();

        return response()->json([
            'success' => true,
            'message' => 'Customer list',
            'data'    => $customers
        ]);
    }

    /**
     * show() Find customer By ID
     *
     * @param integer $id
     * @return response
     */
    public function show($id)
    {
        $customer = $this->customerRepository->findById($id);
        if (is_null($customer)) {
            return response()->json([
                'success' => false,
                'message' => 'Customer details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Customer details',
            'data'    => $customer
        ]);
    }

    /**
     * store() Create New Customer
     *
     * @param Request $request
     * @return response
     */
    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',            
            'address' => 'required'            
        ], [
            'name.required' => 'Please give customer name',            
            'address.required' => 'Please give customer address'            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $customer = $this->customerRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Customer stored',
            'data'    => $customer
        ]);
    }

    /**
     * update() Update customer by id
     *
     * @param Request $request
     * @param integer $id
     * @return response
     */
    public function update(Request $request, $id)
    {
        $customer = $this->customerRepository->findById($id);
        if (is_null($customer)) {
            return response()->json([
                'success' => false,
                'message' => 'Customer Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();

        //return $request;

        $validator = \Validator::make($formData, [
            'name' => 'required',            
            'address' => 'required'            
        ], [
            'name.required' => 'Please give customer name',            
            'address.required' => 'Please give customer address'            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $customer = $this->customerRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Customer updated',
            'data'    => $customer
        ]);
    }

    /**
     * destry() Delete a customer
     *
     * @param integer $id
     * @return response
     */
    public function destroy($id)
    {
        $customer = $this->customerRepository->findById($id);

        if (is_null($customer)) {
            return response()->json([
                'success' => false,
                'message' => 'Customer not found',
                'data' => null,
            ]);
        }

        $customer = $this->customerRepository->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Customer deleted',
            'data'    => $customer
        ]);
    }
}

