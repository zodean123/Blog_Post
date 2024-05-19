import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState,} from 'react';
import Editor from '../Editor';
import { Navigate } from 'react-router-dom';

export default function CreatePost(){
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
      async function createNewPost(ev){
         const data = new FormData(); //new object to handle form data
        data.set('title',title);
        data.set('content',content);
        data.set('summary',summary);
        data.set('file',files[0]);
        console.log(files);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post',{
            method:'POST',
            body:data,
            credentials:'include',
        });
     if(response.ok){
        setRedirect(true);
     }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <>
        <form className ="CreatePost" onSubmit={createNewPost}>
            <input type="title" placeholder={'Title'} value = {title} onChange = {ev=>setTitle(ev.target.value)}/>
            <input type = "summary" placeholder="Summary" value={summary} onChange={ev=>setSummary(ev.target.value)}/>
            <input type="file" placeholder='File' onChange={ev=>setFiles(ev.target.files)}/>
            <Editor value={content} onChange={setContent} />
            <button className="PostButton">Create Post</button>
        </form>
        </>
    )
}