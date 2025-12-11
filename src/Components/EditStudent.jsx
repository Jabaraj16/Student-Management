import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:'100vh',
    overflow:'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
function EditStudent() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <button onClick={handleOpen} className=''><i class="fa-solid fa-pen-to-square"></i></button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Student Details
                    </Typography>
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
                                <FormControlLabel onChange={(e) => handleGender(e)} value="female" control={<Radio />} label="Female" />
                                <FormControlLabel onChange={(e) => handleGender(e)} value="male" control={<Radio />} label="Male" />
                                <FormControlLabel onChange={(e) => handleGender(e)} value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>


                        <div className="flex flex-col mt-6">
                            <label htmlFor="">Upload Student Image</label>
                            <input className="border p-2  mb-4 w-80" type="file" placeholder="hr" />
                        </div>

                        <label className="flex items-center justify-center">Status</label>

                        <div className="flex items-center justify-center gap-4 mt-3">
                            <button className="p-2 border bg-green-400 hover:bg-green-500">Active</button>
                            <button className="p-2 border bg-red-400 hover:bg-red-500">Inactive</button>
                        </div>
                        <div className="flex justify-end gap-3 mt-10">
                            
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">
                                Update
                            </button>
                        </div>
                    </form>

                </Box>
            </Modal>
        </>
    )
}

export default EditStudent