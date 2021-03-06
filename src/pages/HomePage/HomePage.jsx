import React from 'react';
import './HomePage.css';
import Form from '../../components/Form/Form';
import BlogPost from '../../components/BlogPost/BlogPost';
import Button from '../../components/Button/Button';

class HomePage extends React.Component {
  // ? what will happen if we set our initial state.posts as null 
    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     isPosting: false,
    //     posts: []
   	//  }
	// }
	state = {
		isPosting : false,
		posts : []
	}
	// ? when does this method get called
	componentDidMount() {
    getPosts().then(results => 
			this.setState({
        posts: results
			})
		).catch(error => console.error(error))
	}

	handleClick = event => {
		this.setState({
			isPosting: !this.state.isPosting
		})
	}

	// TODO: this whole (lines 24/51) function needs to be refactored. the create post needs to either have the options declared inside of it or more preferably take the options object as an argument. It also needs to take title, author and post. 
	handleAddPost = ({ title, author, post }) => {
		//this line was the culprit of errors we had a '-' instead of a '/' in application/json on line 34
		const options = {
			method: 'POST',
			headers: {
 				'content-type': 'application/json'
			},
			body: JSON.stringify({ title, author, post })
		}
		console.log(options)
		async function createPost() {
			try {
				const sendPost = await fetch('http://localhost:3001/api/users/post', options)
				const postResult = await sendPost.json()
				return await postResult
				} catch (error) {
				console.log('line 39', error)
			}
		}

		createPost().then(result => {
			console.log(result)
			this.setState({
				posts: [{ ...result }, ...this.state.posts],
				isPosting : false
			})
		})
	}

	handleDeletePost = async id => {
		if (this.state.posts.filter((elem => id === elem.id)) === []) {
			throw new Error ('Wrong item')
		}
		// First we delete the post from the database
		await deletePost(id).then(results => console.log(results)).catch(error => console.error(error))
		
		// Then we get the new, updated list of posts from the database and apply it to state

		await getPosts().then(results =>
			this.setState({
				posts: results
			})
		).catch(error => console.error(error))

	}

	render() {
		/**
	    	* *TODO: extract this as a component to another file
		 */

		const postsList = this.state.posts.map((post, index) => {
			return (
				<BlogPost
					key={index}
					{...post}
					handleDeletePost={this.handleDeletePost}
					postId={post._id}
				/>
			)
		})

		return (
			<div>
				<header>
					<h1>Dream Diary</h1>
				</header>
				<section>
					<Button handleClick={this.handleClick} type={'Add New Post'} />
					{!!this.state.isPosting ? (
						<Form handleAddPost={this.handleAddPost} />
					) : null}
          {/* <ul>{postsList}</ul> */}
          { postsList }
				</section>
			</div>
		)
	}
}

async function getPosts() {
	try {
		const fetchPosts = await fetch('http://localhost:3001/api/users/posts')
		const data = await fetchPosts.json()
		console.log(data)
		return await data
	} catch (error) {
		console.log(error)
	}
}

async function deletePost(id) {
	const options = {
		method: 'DELETE'
	}
	try {
		const deletedPost = await fetch(`http://localhost:3001/api/users/post/${id}`, options)
		const response = deletedPost.json()
		return response
	} catch (error) {
		console.error(error)
	}
}

export default HomePage;