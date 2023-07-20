import { Paper, Box, Tab, Tabs, Button, Table, Stack, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import { useState } from "react";
import ModeIcon from '@mui/icons-material/Mode';
import UndoIcon from '@mui/icons-material/Undo';
import ClearIcon from '@mui/icons-material/Clear';
import { DrawOutlined } from "@mui/icons-material";

const LeftPanel = ({files, setState, onPreviewClicked, onDeleteClicked, onUndoClicked, onClearClicked, onColorClicked})=> {

    const [value, setValue] = useState(0)
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const toolTabStyle = {overflow: 'auto', flex: '1', width: 200};
    const imgTabStyle = {overflow: 'auto', flex: '1', width: 700};
    const [cardStyle, setCardStyle] = useState(toolTabStyle);
    const onToolsCliked = (e) => {
        setCardStyle(toolTabStyle);
        setState(true);
    };
    const onImagesCliked = (e) => {
        setCardStyle(imgTabStyle);
        setState(false);
    };

    return ( 
        <Paper sx={cardStyle} elevation={4}>
          <Box>
            <Tabs value={value} onChange={handleTabChange} variant='standard'>
              <Tab label='Tools' onClick={onToolsCliked} />
              <Tab label='Images' onClick={onImagesCliked}/>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0} >
            <Stack spacing={3} color="lightgray"  alignItems='center'>
              <Button startIcon={<ModeIcon fontSize='small'/>} size='small' variant="outlined" color="primary" onClick={onColorClicked}>
                Draw
              </Button>
              <Button startIcon={<UndoIcon fontSize="small"/>} size='small' variant="outlined" color="primary" onClick={onUndoClicked}>
                Undo
              </Button>
              <Button startIcon={<ClearIcon fontSize="small"/>} size='small' variant="outlined" color="primary" onClick={onClearClicked}>
                Clear
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
                    <TableCell align='right'>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                      <TableCell>{index.toString()}</TableCell>
                      <TableCell align='center'>
                        <Typography variant='body1' maxWidth='100px' textOverflow='ellipsis'>{file.fileName}</Typography>
                      </TableCell>
                      <TableCell align='right'>{files.generated? 'yes' : 'no'}</TableCell>
                      <TableCell align='right'><Button variant='outlined' size='small' onClick={() => onPreviewClicked(index)} >view</Button></TableCell>
                      <TableCell align='right'><Button variant='contained' color="error" size='small' onClick={() => onDeleteClicked(index)}>Delete</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomTabPanel>
        </Paper> );
}
 
export default LeftPanel;