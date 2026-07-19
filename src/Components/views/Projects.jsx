import React, { Component } from 'react';
import TopicList from "../common/TopicList";
import Card from "../common/Card";
import Basic from '../Layouts/Basic';
import { PortfolioContext } from '../../Context/PortfolioContext';

export default class Projects extends Component {
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
		const { projects, projectTopics: topics } = data;

		const filteredProjects = selectedTopics.length > 0 ?
			projects.filter(project => {
				return selectedTopics.reduce((acc, next) => {
					return acc && project["topics"].includes(next);
				}, true);
			}) : projects;

		return (
			<>
				<Basic heading="Projects">
					<TopicList
						topics={topics}
						selectedTopics={selectedTopics}
						handleTopicSelect={this.handleTopicSelect} />
					<div className="container-cards">
						{filteredProjects.length > 0 && filteredProjects.map(project => {
							return <Card className="cardified glass02 p-1r b-1r" key={project.title} heading={project.title} links={project.links} content={project.description} tags={project.topics} handleTagSelect={this.handleTopicSelect} />
						})}
					</div>
				</Basic>
			</>
		);
	}
}