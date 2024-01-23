
import './App.css';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client'; 

const socket = io("http://localhost:5000")

function App() {
  // let editorObject = DocumentEditorContainerComponent | null

  const editorRef = useRef(null);

  useEffect(()=>{
    socket.on('documentUpdate', (updatedDocument) =>{
      console.log('Received document update:', updatedDocument);
      editorRef.current.open(JSON.parse(updatedDocument));
    });
    return () =>{
      socket.disconnect();
    };
  },[]);

  const onSave = () =>{
    // editorObject?.documentEditor.save("Sample", "Docx")
    const savedDocument = JSON.stringify(editorRef.current.saveAsBlob('Docx'));
    socket.emit('saveDocument', savedDocument);
  };
  
  return (
    <div className="app">
      <button onClick={onSave} style= {{marginBottom:10, fontSize:20, marginLeft:5, marginTop:5}}>Save</button>

      <DocumentEditorContainerComponent  ref={editorRef} height='590' enableToolbar={true}
        serviceUrl ="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/">

        <Inject services={[Toolbar]}></Inject>
      </DocumentEditorContainerComponent>
    </div>
  );
}

export default App;
