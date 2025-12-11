import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';


export default function Modal({ open, onClose }) {
    const [genderValue,setGenderValue]=useState("")
    if (!open) return null;
    const handleGender=(e)=>{
        setGenderValue(e.target.value)
    }
    console.log(genderValue);
    
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">

            <div className="bg-white p-6 rounded-lg shadow-lg w-150 h-full overflow-auto">
                <h2 className="text-xl font-semibold mb-3 text-center">Add Student Deatils</h2>
                <hr />
                <div className="mt-5">
                    <form action="" >
                        <input className="border p-2  mb-4 w-full" type="text" placeholder="Enter Name" />
                        <input className="border p-2  mb-4 w-full" type="email" placeholder="Enter email" />
                        <input className="border p-2 mb-4 w-full" type="text" placeholder="Enter phone" />
                        <input className="border p-2  mb-4 w-full" type="text" placeholder=" course" />
                        <input className="border p-2  mb-4 w-full" type="text" placeholder=" Batch" />


                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel onChange={(e)=>handleGender(e)} value="female" control={<Radio />} label="Female" />
                                <FormControlLabel onChange={(e)=>handleGender(e)} value="male" control={<Radio />} label="Male" />
                                <FormControlLabel onChange={(e)=>handleGender(e)} value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>


                        <div className="flex flex-col mt-6">
                            <label htmlFor="">Upload Student Image</label>
                            <input className="border p-2  mb-4 w-80" type="file" placeholder="hr" />
                        </div>

                        <label className="flex items-center justify-center">Staus</label>

                        <div className="flex items-center justify-center gap-4 mt-3">
                            <button className="p-2 border bg-green-400 hover:bg-green-500">Active</button>
                            <button className="p-2 border bg-red-400 hover:bg-red-500">Inactive</button>
                        </div>
                    </form>

                </div>
                <div className="flex justify-end gap-3 mt-10">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">
                        Add
                    </button>
                </div>
            </div>

        </div>
    );
}