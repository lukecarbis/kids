export async function get({ params }) {
	return {
		status: 200,
		headers: {},
		body: {
			name: params.name,
			jobs: [
				{
					title: 'Wash Hands',
					description: '"… al netilat yadayim."',
					emoji: '🙌',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Shower',
					description: 'Nice and clean, ready for the day.',
					emoji: '🚿',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Daven',
					description: 'Time for morning brachot and the Shema.',
					emoji: '🙏',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Give Tzedakah',
					description: 'Create an attitude of generosity every day.',
					emoji: '💲',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Get Dressed',
					description: 'Put some weather appropriate clothes on.',
					emoji: '👕',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Eat Breakfast',
					description: 'Energy for an active day.',
					emoji: '🥞',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Brush Teeth',
					description: 'Dental care, morning and evening.',
					emoji: '🪥',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Feed Pepper',
					description: 'Dogs needs breakfast too! Make sure she has some water.',
					emoji: '🐶',
					hour: 5,
					done: false,
					skipped: false
				},
				{
					title: 'Tidy Breakfast',
					description: 'Clear the table and wash up the bowls and plates.',
					emoji: '🥣',
					hour: 8,
					done: false,
					skipped: false
				},
				{
					title: 'Maths',
					description: 'Number games keep you sharp!',
					emoji: '🔢',
					hour: 8,
					done: false,
					skipped: false
				},
				{
					title: 'Clarinet',
					description: 'A little practice every day.',
					emoji: '🎶',
					hour: 8,
					done: false,
					skipped: false
				},
				{
					title: 'Tidy Bedroom',
					description: 'A clean room makes a clean mind.',
					emoji: '🛏',
					hour: 15,
					done: false,
					skipped: false
				},
				{
					title: 'Set Table',
					description: 'Get everything ready for dinner.',
					emoji: '🍽',
					hour: 17,
					done: false,
					skipped: false
				},
				{
					title: 'Brush Teeth',
					description: 'Clean those chompers.',
					emoji: '🪥',
					hour: 18,
					done: false,
					skipped: false
				},
				{
					title: 'Pyjamas On',
					description: 'If only we could wear pyjamas all the time!',
					emoji: '🥱',
					hour: 18,
					done: false,
					skipped: false
				}
			]
		}
	};
}
