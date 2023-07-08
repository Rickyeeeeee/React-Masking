import './App.css';
import { useEffect, useState, useRef } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LeftPanel from './components/LeftPanel';
import { Fab } from '@mui/material';
import { create, duration } from '@mui/material/styles/createTransitions';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DeliveryDining } from '@mui/icons-material';

function App() {
  
  const [editing, setEditing] = useState(true)
  let key = 0;

  function createData(fileName, generated, blob) {
    key += 1;
    return { fileName, generated, key, blob };
  }
  const [imgFiles, setImgFiles] = useState([])
  
  const [curImg, setCurImg] = useState(0);
  const [delImg, setDelImg] = useState(0);

  const [gridHeight, setGridHeight] = useState(window.innerHeight);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setGridHeight(window.innerHeight);
      setGridWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fileInputRef = useRef(null);

  const handleFabClick = () => {
    fileInputRef.current.click();
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const newImgFiles = Array.from(e.target.files).map((file) => {
      return createData(file.name, false, file);
    });
    setImgFiles([...imgFiles, ...newImgFiles]);

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setSelectedImage(img);
          const canvas = canvasRef.current;
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onPreviewButtonCliked = (index) => { 
    setCurImg(index);
   }

  useEffect(() => {
    const file = curImg != -1 ? imgFiles[curImg] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setSelectedImage(img);
          const canvas = canvasRef.current;
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
        };
        img.src = reader.result;
      };
      console.log(file.fileName);
      reader.readAsDataURL(file.blob);
    } else {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log('what');
    }
  }, [curImg]);

  return (
    <div className='App' style={{marginTop: '50px', display: 'flex'}}>
      <Fab variant='extended' onClick={handleFabClick} size='large' style={{position: 'fixed', right: '20px', bottom: '10px'}}>
        {/* <NavigationIcon sx={{ mr: 1 }} /> */}
        <FileUploadIcon/>
        Upload
      </Fab>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
        multiple
      />
      <Fab variant='extended' color='primary' size='large' style={{position: 'fixed', right: '150px', bottom: '10px'}}>
        {/* <NavigationIcon sx={{ mr: 1 }} /> */}
        Generate
      </Fab>
      <div style={{marginLeft: '30px', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <LeftPanel 
          files={imgFiles} 
          setState={setEditing} 
          onPreviewClicked={(index) => {
            setCurImg(index);
          }} 
          onDeleteClicked={(index) => {
            let newImg = curImg;
            if (curImg > index) {
              newImg -= 1;
            } else if (curImg == index) {
              newImg = -1;
            }
            setCurImg(newImg);
            setDelImg(index);
            const newImgFiles = [...imgFiles];
            newImgFiles.splice(index, 1);
            setImgFiles(newImgFiles);
          }}/>
      </div>
      <div style={{marginLeft: '30px', display: 'flex', flex: 1}}>
        <div className='canva-img' style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <canvas ref={canvasRef} id="mycanvas"style={{
            padding: '0px',
            margin: '0px',
            objectFit: 'contain',
            backgroundColor: 'lightgray',
            maxHeight: gridHeight - 50 - 100,
            maxWidth: gridWidth - (200 + 60) - 100
          }}></canvas>
          <div>
            <p>
              File: {curImg != -1 && imgFiles[curImg]? imgFiles[curImg].fileName : 'no'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;