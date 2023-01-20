import React, {useState, useMemo} from 'react'
//import ClassCounter from './components/ClassCounter'
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
//import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
//import MyButton from './components/UI/button/MyButton';
//import MyInput from './components/UI/input/MyInput';
import MyModal from './components/UI/modal/MyModal';
//import MySelect from './components/UI/select/MySelect';
import './styles/App.css'

function App() {
  const  [posts, setPosts] = useState([
    {id: 1, title: 'Первый', body: 'фф'},
    {id: 2, title: 'Второй', body: 'аа'},
    {id: 3, title: 'Третий', body: 'вв'},
    {id: 4, title: 'Четвертый', body: 'жж'},
    {id: 5, title: 'Пятый', body: 'рр'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo( () => {
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo( () => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className='App'>
      <MyButton style={{marginTop: 30}}onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      

      <hr style={{margin: '15px'}}/>

      <PostFilter 
        filter={filter} 
        setFilter={setFilter}/>

      {sortedAndSearchedPosts.length
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JavaScript'/>
        : <h1 style={{textAlign: 'center'}}>Посты не неайдены</h1>
      }
      
    </div>
  );
}

export default App;
