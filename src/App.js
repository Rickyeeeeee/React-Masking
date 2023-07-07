import './App.css';
import { Grid, Paper, Button, Stack, Tab, Tabs, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Card } from '@mui/material';
import { useState } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}




function App() {
  let key = 0;
  function createData(fileName, generated) {
    key += 1;
    return { fileName, generated, key };
  }
  const files = [
    createData('imjgwoajgwpefkg1.jpg', false),
    createData('img2.jpg', false),
    createData('img3.jpg', false),
    createData('img3.jpg', false),
    createData('img3.jpg', false),
    createData('img3.jpg', false),
    createData('img3.jpg', false),
    createData('img3.jpg', false),
    createData('img3.jpg', false),
    createData('img4.jpg', false)
  ];
  const [value, setValue] = useState(0)
  const [cardStyle, setCardStyle] = useState({overflow: 'auto', flex: '1', width: 200})
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onToolsCliked = (e) => {
    setCardStyle({overflow: 'auto', flex: '1', width: 200});
  };
  const onImagesCliked = (e) => {
    setCardStyle({overflow: 'auto', flex: '1', width: 600});
  };
  
  return (
    // <div className="App" >
    //   <Button variant='contained' color='secondary' size='large' style={{position: 'fixed', bottom: '20px', right: '200px'}}>
    //     Generate
    //   </Button>
    //   <Button variant='outlined' color='secondary' size='large' style={{position: 'fixed', bottom: '20px', right: '20px'}}>
    //     Upload image
    //   </Button>
    //   <div style={{marginTop: "100px", marginLeft: '40px'}}>
    //     <Grid container direction='row' justifyContent='space-around' spacing={3}>
    //       <Grid item xs={12} sm={6} md={4} lg={3}>
    //         <Paper elevation={5} >
    //           <Box>
    //             <Tabs value={value} onChange={handleChange} variant='fullWidth'>
    //               <Tab label='Tools'/>
    //               <Tab label='Images'/>
    //             </Tabs>
    //           </Box>
    //           <CustomTabPanel value={value} index={0}>
    //             <Stack spacing={3} color="lightgray" >
    //               <Button size='small' variant="outlined" color="primary">
    //                 Draw
    //               </Button>
    //               <Button size='small' variant="outlined" color="primary">
    //                 Undo
    //               </Button>
    //               <Button size='small' variant="outlined" color="primary">
    //                 Clear All
    //               </Button>
    //               <Button size='small' variant="outlined" color="primary">
    //                 Zoom in
    //               </Button>
    //               <Button size='small' variant="outlined" color="primary">
    //                 Zoom out
    //               </Button>
    //               <Button size='small' variant="outlined" color="primary">
    //                 Move
    //               </Button>
    //             </Stack> 
    //           </CustomTabPanel>
    //           <CustomTabPanel value={value} index={1}>
    //             <Stack spacing={3} color="lightgray">
    //               <Button size='small' variant="contained" color="primary">
    //                 Undo
    //               </Button>
    //               <Button size='small' variant="contained" color="primary">
    //                 Clear All
    //               </Button>
    //               <Button size='small' variant="contained" color="primary">
    //                 Zoom in
    //               </Button>
    //               <Button size='small' variant="contained" color="primary">
    //                 Zoom out
    //               </Button>
    //               <Button size='small' variant="contained" color="primary">
    //                 Move
    //               </Button>
    //             </Stack> 
    //           </CustomTabPanel>
    //         </Paper>
    //       </Grid>
    //       <Grid item xs={12} sm={6} md={8} lg={9} >
    //         <img src='https://th.bing.com/th/id/OIP.8U8Za7792QwMkrTYZ2xufQHaE8?w=270&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7' alt='' style={{
    //           padding: '0px',
    //           margin: '0px',
    //           // maxWidth: '100%',
    //           // maxHeight: '100%',
    //           // objectFit: 'contain',
    //           // display: 'block',
    //           width: '80%'
    //           // height: '80%'
    //         }}
    //           ></img>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </div>
    <div className='App' style={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}>
      <div style={{marginLeft: '20px', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Card style={cardStyle}>
          <Box>
            <Tabs value={value} onChange={handleChange} variant='standard'>
              <Tab label='Tools' onClick={onToolsCliked} />
              <Tab label='Images' onClick={onImagesCliked}/>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0} >
            <Stack spacing={3} color="lightgray"  alignItems='center'>
              <Button size='small' variant="outlined" color="primary">
                Draw
              </Button>
              <Button size='small' variant="outlined" color="primary">
                Undo
              </Button>
              <Button size='small' variant="outlined" color="primary">
                Clear All
              </Button>
              <Button size='small' variant="outlined" color="primary">
                Zoom in
              </Button>
              <Button size='small' variant="outlined" color="primary">
                Zoom out
              </Button>
              <Button size='small' variant="outlined" color="primary">
                Move
              </Button>
            </Stack> 
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TableContainer  style={{overflow: 'auto', maxHeight: 400}}>
              <Table stickyHeader size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell >Num</TableCell>
                    <TableCell align='center'>Files</TableCell>
                    <TableCell align='right'>Mask</TableCell>
                    <TableCell align='right'>Preview</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                      <TableCell>{index.toString()}</TableCell>
                      <TableCell align='center'>
                        <Typography variant='body1' maxWidth='100px' textOverflow='ellipsis'>{file.fileName}</Typography>
                      </TableCell>
                      <TableCell align='right'>{files.generated? 'yes' : 'no'}</TableCell>
                      <TableCell align='right'><Button variant='outlined' size='small' disabled>view</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomTabPanel>
        </Card>
      </div>
      <div style={{flex: 1}}>
        <img src='https://th.bing.com/th/id/OIP.8U8Za7792QwMkrTYZ2xufQHaE8?w=270&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7' alt='' style={{
          padding: '0px',
            margin: '0px',
            // maxWidth: '100%',
            // maxHeight: '100%',
            // objectFit: 'contain',
            // display: 'block',
            width: '80%'
            // height: '80%'
          }}
          ></img>
      </div>
    </div>
  );
}

export default App;