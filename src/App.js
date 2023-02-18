import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {blogs: [], isLoading: false}

  componentDidMount() {
    this.fetchBlog()
  }

  fetchBlog = async () => {
    this.setState({isLoading: true})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    const {packages} = data
    const convertedData = packages.map(post => ({
      id: post.id,
      imageUrl: post.image_url,
      description: post.description,
      name: post.name,
    }))
    this.setState({blogs: convertedData, isLoading: false})
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderBlogs = () => {
    const {blogs} = this.state
    return (
      <ul className="cards-container">
        {blogs.map(item => (
          <li className="card" key={item.id}>
            <img src={item.imageUrl} alt={item.name} className="card-img" />
            <div className="card-body">
              <h1 className="card-heading">{item.name}</h1>
              <p className="card-description">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <div className="heading-container">
            <h1>Travel Guide</h1>
          </div>
          <div>{isLoading ? this.renderLoader() : this.renderBlogs()}</div>
        </div>
      </div>
    )
  }
}

export default App
