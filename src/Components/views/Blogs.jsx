import React, { Component } from 'react';
import TopicList from "../common/TopicList";
import Card from "../common/Card";
import Basic from '../Layouts/Basic';
import { PortfolioContext } from '../../Context/PortfolioContext';

export default class Blogs extends Component {
	static contextType = PortfolioContext;

	state = {
		selectedTopics: []
	}

	handleTopicSelect = (topic) => {
		const selectedTopics = new Set(this.state.selectedTopics);
		if (selectedTopics.has(topic))
			selectedTopics.delete(topic);
		else
			selectedTopics.add(topic);

		this.setState({
			selectedTopics: [...selectedTopics]
		});
	}

	render() {
		const { selectedTopics } = this.state;
		const { data } = this.context;
		const { blogs, blogTopics: topics } = data;

		const filteredBlogs = selectedTopics.length > 0 ?
			blogs.filter(blog => {
				return selectedTopics.reduce((acc, next) => {
					return acc && blog["topics"].includes(next);
				}, true);
			}) : blogs;

		return (
			<Basic heading="Blogs">
				<TopicList
					topics={topics}
					selectedTopics={selectedTopics}
					handleTopicSelect={this.handleTopicSelect} />
				<div className="container-cards">
					{filteredBlogs.length > 0 && filteredBlogs.map(blog => {
						return <Card className="cardified glass02 p-1r b-1r" key={blog.title} heading={blog.title} content={blog.description} links={blog.links} tags={blog.topics} handleTagSelect={this.handleTopicSelect} />
					})}
				</div>
			</Basic>
		);
	}
}