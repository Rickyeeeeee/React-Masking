import './App.css';
import { useEffect, useState, useRef } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LeftPanel from './components/LeftPanel';
import { Fab, Paper } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function App() {
  
  const [editing, setEditing] = useState(true)
  const editingRef = useRef(true); 
  useEffect(() => {
    editingRef.current = editingRef;
  })
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
  
  const imageRef = useRef(null);
  
  function DrawImage() {
    return () => {
      const file = curImg != -1 ? imgFiles[curImg] : null;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          imageRef.current = new Image();
          imageRef.current.onload = () => {
            setSelectedImage(imageRef.current);
            const canvas = canvasRef.current;
            canvas.width = imageRef.current.width;
            canvas.height = imageRef.current.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(imageRef.current, 0, 0);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 8;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
          };
          imageRef.current.src = reader.result;
        };
        console.log(file.fileName);
        reader.readAsDataURL(file.blob);
      } else {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log('what');
      }
    };
  }

  const handleImageUpload = (e) => {
    const newImgFiles = Array.from(e.target.files).map((file) => {
      return createData(file.name, false, file);
    });
    setImgFiles([...imgFiles, ...newImgFiles]);
    
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imageRef.current = new Image();
        imageRef.current.onload = () => {
          setSelectedImage(imageRef.current);
          const canvas = canvasRef.current;
          canvas.width = imageRef.current.width;
          canvas.height = imageRef.current.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(imageRef.current, 0, 0);
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 5;
          ctx.strokeRect(0, 0, canvas.width, canvas.height);
        };
        imageRef.current.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onPreviewButtonCliked = (index) => { 
    setCurImg(index);
   }

  useEffect(DrawImage, [curImg]);

  const [circles, setCircles] = useState([]);
  const circleColor = useRef('blue')

  useEffect(() => {
    
    function handleCanvasClick(event) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scaleX = rect.width / canvasWidth;
      const scaleY = rect.height / canvasHeight;
      const scale = Math.min(scaleX, scaleY);
      const { clientX, clientY } = event;
      const x = (clientX - rect.left) / scale;
      const y = (clientY - rect.top) / scale;
      console.log(event.clientX, event.clientY);
      console.log(rect.left, rect.top);
      console.log(x, y);
      const radius = 5 / scale;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = circleColor.current;
      console.log(circleColor);
      
      ctx.fill();
      ctx.closePath();
      
      // Add the circle to the list
      setCircles((prevCircles) => [...prevCircles, { x, y, radius, color: circleColor.current }]);
    }
    
    const canvas = canvasRef.current;
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  const handleUndoClick = () => {
    // Remove the last circle from the list
    console.log(imageRef.current);
    if (!imageRef.current) return;
    setCircles((prevCircles) => prevCircles.slice(0, -1));
    // Clear the canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // Redraw all remaining circles
    circles.slice(0, -1).forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.fillStyle = circle.color;
      ctx.fill();
      ctx.closePath();
    });
  };
  
  const handleClearClick = () => {
    // Clear the circles list
    if (!imageRef.current) return;

    setCircles([]);
    // Clear the canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  };
  
  const handleChangeColorClick = () => {
    if (!imageRef.current) return;

    circleColor.current = circleColor.current === 'blue' ? 'red' : 'blue';
  };

  return (
    <div className='App' style={{marginTop: '50px', display: 'flex'}}>
      <Fab variant='extended' onClick={handleFabClick} size='large' style={{position: 'fixed', left: '20px', bottom: '30px'}}>
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
      <Fab variant='extended' color='primary' size='large' style={{position: 'fixed', left: '150px', bottom: '30px'}}>
        <AutorenewIcon />
        Generate
      </Fab>
      <div style={{marginLeft: '30px', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <LeftPanel 
          files={imgFiles} 
          setState={setEditing} 
          onPreviewClicked={(index) => {
            handleClearClick();
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
          
          }}
          onUndoClicked={handleUndoClick}
          onClearClicked={handleClearClick}
          onColorClicked={handleChangeColorClick}/>
      </div>
      <div style={{marginLeft: '30px', display: 'flex', flex: 1}}>
        <div className='canva-img' style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Paper elevation={3} style={{marginRight: '30px'}}>

          <canvas ref={canvasRef} id="mycanvas"style={{
            boxShadow: 'initial',
            padding: '0px',
            margin: '0px',
            objectFit: 'contain',
            backgroundColor: 'lightgray',
            maxHeight: gridHeight - 50 - 100,
            maxWidth: gridWidth - (editing? 200 + 60 : 700 + 60) - 100
          }}
            ></canvas>
          </Paper >
          <div>
            <h3>
              File {curImg.toString() + ': ' + (curImg != -1 && imgFiles[curImg]? imgFiles[curImg].fileName : 'no')}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;