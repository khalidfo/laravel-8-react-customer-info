<?php

namespace App\Repositories;

use App\Models\Customer;
use App\interfaces\CurdInterface;
use Illuminate\Http\Request;

class CustomerRepository implements CurdInterface
{
    public function getAll()
    {
        $customers = Customer::orderBy('id', 'DESC')->get();
        return $customers;
    }
    /**
     * 
     */
    public function findById($id)
    {
        $customer = Customer::find($id);
        return $customer;
    }
    public function create(Request $request)
    {
        $customer = new Customer();
        $customer->name = $request->name;
        $customer->address = $request->address;
        $customer->save();
        return $customer;
    }
    public function edit(Request $request, $id)
    {
        $customer = $this->findById($id);
        $customer->name = $request->name;
        $customer->address = $request->address;
        $customer->save();
        return $customer;
    }
    public function delete($id)
    {
        $customer = $this->findById($id);        
        $customer->delete();
        return $customer;
    }
}
