import view from '../utils/view.js';
import Story from '../components/Story.js';
import Comment from '../components/Comment.js';

export default async function Item() {
	let story = null;
	let hasComments = false;
	let hasError = false;
	try {
		story = await getStory();
		hasComments = story.comments.length > 0;
	} catch (error) {
		hasError = true;
		console.log(error);
	}

	if (hasError) {
		view.innerHTML = `<div class="error">Error fetching story</div>`;
	}
	view.innerHTML = `  <div>
    ${Story(story)}
  </div>
	<hr/>
	${hasComments ? story.comments.map((comment) => Comment(comment)).join('') : 'No comments'}
	`;
}

async function getStory() {
	// we use here the [1] to get the second element fron the array. as split gives us an array with 2 elements, and we only need the second. the id number
	const storyId = window.location.hash.split('?id=')[1];

	const response = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`);
	const story = await response.json();
	return story;
}
