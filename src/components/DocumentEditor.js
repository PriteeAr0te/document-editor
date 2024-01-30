import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client'; 

const socket = io("http://localhost:5000")

const DocumentEditor = ()=>{
  let navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
        navigate("/login")
    }
},[])

    let editorObject = DocumentEditorContainerComponent | null
  const [content, setContent] = useState("");

  useEffect(() => {
    // Listen for document updates from other users
    socket.on('documentUpdate', (updatedContent) => {
      const decodedContent = atob(updatedContent);
      setContent(decodedContent);
      console.log(decodedContent)
      console.log("Document Updated")
    });

    return () => {
      // Clean up socket event listener when the component unmounts
      socket.off('documentUpdate');
    };
  }, []);

  const onSave = () =>{
    editorObject?.documentEditor.save("Sample", "Docx")
    const documentContent = editorObject?.documentEditor.saveAsBlob('Docx').then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = btoa(reader.result);
        socket.emit('saveDocument', base64data);
      };
      reader.readAsDataURL(blob);
    });
    alert("Your Document Saved")
  };


  return (
    <div className="app">
      <button className="btn button" onClick={onSave} style= {{marginBottom:10, fontSize:20, marginLeft:5, marginTop:5}}>Save</button>

      <DocumentEditorContainerComponent  ref={(ins =>editorObject=ins)} height='590' enableToolbar={true}
        serviceUrl ="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/">

        <Inject services={[Toolbar]}></Inject>
      </DocumentEditorContainerComponent>
    </div>
  );
}

export default DocumentEditor;