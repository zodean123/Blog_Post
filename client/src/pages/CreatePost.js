import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState,} from 'react';
import Editor from '../Editor';


export default function CreatePost(){
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    return(
        <>
        <form action="">
            <input type="title" placeholder={'Title'} value = {title} onChange = {ev=>setTitle(ev.target.value)}/>
            <input type = "summary" placeholder="Summary" value="summary" onChange={ev=>setSummary(ev.target.value)}/>
            <input type="file" />
            <Editor value={content} onChange={setContent} />
            <button className="PostButton">Create Post</button>
        </form>
        </>
    )
}