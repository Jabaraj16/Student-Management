import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardActions from '@mui/material/CardActions';
import EditStudent from './EditStudent';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function StudentCard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='mt-5  container mx-auto '>
      <h1 className='text-4xl'>All Student List <hr /></h1>
      <div className=' w-full  grid grid-cols-6 gap-4 mt-10 '>
        <Card className='shadow-xl border mb-5 w-46'  >
          <CardActionArea>

            <CardMedia className='bg-cover'
              onClick={handleOpen}
              component="img"
              height="100"
              image="https://cdn-icons-png.flaticon.com/512/5609/5609019.png"
              alt="green iguana"
            />
            <CardContent className='text-center' >
              <Typography gutterBottom variant="h5" component="div">
                <h1>Lizard</h1>
                <span className='font-light text-sm'>BCA</span>
                <div className='flex gap-2 justify-between mt-2'>
                  <button className=''><i class="fa-solid fa-trash"></i></button>
                  <EditStudent />
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>



      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style} >
          <Card className='flex items-center justify-center content-center flex-col text-center' >
            <div className=''><img className='w-56 ' src="https://cdn-icons-png.flaticon.com/512/5609/5609019.png" alt="" /></div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <h1>Name: jabarah</h1>
                <h1>Email: jabarajraju1590@gmail.com</h1>
                <h1>Phone:</h1>
                <h1>Batch:</h1>
                <h1>Course:</h1>
                <h1>Status:</h1>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  )
}

export default StudentCard