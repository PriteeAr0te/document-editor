
import './App.css';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client'; 

const socket = io("http://localhost:5000")

function App() {
  let editorObject = DocumentEditorContainerComponent | null

  

  const onSave = () =>{
    editorObject?.documentEditor.save("Sample", "Docx")
  };
  
  return (
    <div className="app">
      <button onClick={onSave} style= {{marginBottom:10, fontSize:20, marginLeft:5, marginTop:5}}>Save</button>

      <DocumentEditorContainerComponent  ref={(ins =>editorObject=ins)} height='590' enableToolbar={true}
        serviceUrl ="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/">

        <Inject services={[Toolbar]}></Inject>
      </DocumentEditorContainerComponent>
    </div>
  );
}

export default App;