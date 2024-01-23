
import './App.css';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';

function App() {
  let editorObject = DocumentEditorContainerComponent | null
  const onSave = () =>{
    editorObject?.documentEditor.save("Sample", "Docx")
    editorObject?.documentEditor.save("Sample", "PDF")
  }
  return (
    <div className="app">
      <button onClick={onSave} style= {{marginBottom:10, fontSize:20, marginLeft:5, marginTop:5}}>Save</button>
      <DocumentEditorContainerComponent ref = {(ins=>editorObject=ins)} height='590' enableToolbar={true}
        serviceUrl ="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/">
        <Inject services={[Toolbar]}></Inject>
      </DocumentEditorContainerComponent>
    </div>
  );
}

export default App;
