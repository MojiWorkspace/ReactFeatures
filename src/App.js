import React, {useState} from 'react'
import ClassCounter from './components/ClassCounter'
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css'

function App() {
  const  [posts, setPosts] = useState([
    {id: 1, title: 'Первый', body: 'фф'},
    {id: 2, title: 'Второй', body: 'аа'},
    {id: 3, title: 'Третий', body: 'вв'},
    {id: 4, title: 'Четвертый', body: 'жж'},
    {id: 5, title: 'Пятый', body: 'рр'}
  ])

  const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))

  }

  return (
    <div className='App'>
      <PostForm create={createPost}/>
      <hr style={{margin: '15px'}}/>
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Сотрировка'
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
      </div>


      {/*Условная отрисовка*/}
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title='Посты про JavaScript'/>
        : <h1 style={{textAlign: 'center'}}>Посты не неайдены</h1>
      }
      
    </div>
  );
}

export default App;
