import React, {useState, useMemo, useEffect} from 'react'
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import './styles/App.css'
import PostServise from './API/PostServise';
import Loader from './components/UI/loader/Loader';

function App() {
  const  [posts, setPosts] = useState([
    {id: 1, title: 'Первый', body: 'Ф'},
    {id: 2, title: 'Второй', body: 'А'},
    {id: 3, title: 'Третий', body: 'В'},
    {id: 4, title: 'Четвертый', body: 'Ж'},
    {id: 5, title: 'Пятый', body: 'Р'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [isPostLoading, setIsPostLoading]= useState(false)

  useEffect(() => {
    fetchPosts()
  }, []) 


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts (){
    setIsPostLoading(true)
    setTimeout( async () => {
      const posts = await PostServise.getAll()
      setPosts(posts)
      setIsPostLoading(false)
    }, 2000)
    
  }

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className='App'>
      
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>

      <MyButton onClick={fetchPosts}>
        Отправить запрос на получение постов
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      

      <hr style={{margin: '15px'}}/>

      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />

      {isPostLoading 
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список различных записей'/>
      }

      {/* {sortedAndSearchedPosts.length
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список различных записей'/>
        : <h1 style={{textAlign: 'center'}}>Посты не неайдены</h1>
      } */}
      
    </div>
  );
}

export default App;
