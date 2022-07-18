export async function get({ params }) {
	return {
		status: 200,
		headers: {},
		body: {
			name: params.name,
			checkpoints: [
				{
					title: 'Good Morning!',
					description: 'Time to start the day!',
					emoji: '🌞',
					hour: 0,
					fromIndex: 0,
					toIndex: 8
				},
				{
					title: 'Learning Time',
					description:
						'"Self-education is, I firmly believe, the only kind of education there is." — Isaac Asimov',
					emoji: '📚',
					hour: 8,
					fromIndex: 9,
					toIndex: 10
				},
				{
					title: 'Afternoon Chores',
					description: 'Doing your part to keep our home a safe place for everyone.',
					emoji: '🏡',
					hour: 15,
					fromIndex: 11,
					toIndex: 12
				},
				{
					title: 'Good night!',
					description: 'Time to get ready for bed.',
					emoji: '🌜',
					hour: 19,
					fromIndex: 13,
					toIndex: 14
				}
			],
			jobs: [
				{
					title: 'Wash Hands',
					description: '"… al netilat yadayim."',
					emoji: '🙌',
					done: false,
					skipped: false
				},
				{
					title: 'Shower',
					description: 'Nice and clean, ready for the day.',
					emoji: '🚿',
					done: false,
					skipped: false
				},
				{
					title: 'Daven',
					description: 'Time for morning brachot and the Shema.',
					emoji: '🙏',
					done: false,
					skipped: false
				},
				{
					title: 'Give Tzedakah',
					description: 'Create an attitude of generosity every day.',
					emoji: '💲',
					done: false,
					skipped: false
				},
				{
					title: 'Get Dressed',
					description: 'Put some weather appropriate clothes on.',
					emoji: '👕',
					done: false,
					skipped: false
				},
				{
					title: 'Eat Breakfast',
					description: 'Energy for an active day.',
					emoji: '🥞',
					done: false,
					skipped: false
				},
				{
					title: 'Brush Teeth',
					description: 'Dental care, morning and evening.',
					emoji: '🪥',
					done: false,
					skipped: false
				},
				{
					title: 'Feed Pepper',
					description: 'Dogs needs breakfast too! Make sure she has some water.',
					emoji: '🐶',
					done: false,
					skipped: false
				},
				{
					title: 'Tidy Breakfast',
					description: 'Clear the table and wash up the bowls and plates.',
					emoji: '🥣',
					done: false,
					skipped: false
				},
				{
					title: 'Maths',
					description: 'Number games keep you sharp!',
					emoji: '🔢',
					done: false,
					skipped: false
				},
				{
					title: 'Clarinet',
					description: 'A little practice every day.',
					emoji: '🎶',
					done: false,
					skipped: false
				},
				{
					title: 'Tidy Bedroom',
					description: 'A clean room makes a clean mind.',
					emoji: '🛏',
					done: false,
					skipped: false
				},
				{
					title: 'Set Table',
					description: 'Get everything ready for dinner.',
					emoji: '🍽',
					done: false,
					skipped: false
				},
				{
					title: 'Brush Teeth',
					description: 'Clean those chompers.',
					emoji: '🪥',
					done: false,
					skipped: false
				},
				{
					title: 'Pyjamas On',
					description: 'If only we could wear pyjamas all the time!',
					emoji: '🥱',
					done: false,
					skipped: false
				}
			]
		}
	};
}
