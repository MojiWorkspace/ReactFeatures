import React, {useState} from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'


    /*Способ получения данных из неуправляемого input-а
  Однако это не работает для кастомных компонентов
  React не понимает куда именно ссылку нужно передавать
  с помощью хука useRef мы можем получать напрямую доступ к DOM-элементу (но не рекомендуется к практике)*/
 // const bodyInputRef = useRef()

  /*Для создания нового поста необходимо передать данные из соответствующих input
  Способ получения данных из input: сделать input управляемым - создаем некоторе состояние 
  (по умолчанию будет пустой строкой) и реализовать двухстороннее связывание
  связываем value input-а с состоянием titile*/
  //const  [post, setPost] = useState({title: '', body: ''})

  
const PostForm = ({create}) => {
    const  [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
          }
          create(newPost)
          setPost({title: '', body: ''})

      }


    return(
        <form>
        {/*Управляемый компонент*/}
        <MyInput 
          value={post.title}
          onChange={e => setPost({...post,  title: e.target.value})}
          type='text' 
          placeholder='Название поста'
        />

        <MyInput 
          value={post.body}
          onChange={e => setPost({...post,  body: e.target.value})}
          type='text' 
          placeholder='Опсиание поста'
        />
        
        {/* Неуправляемый компонент
        <MyInput 
          ref={bodyInputRef}
          type='text' 
          placeholder='Описание поста'
        /> */}

        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    )
}

export default PostForm