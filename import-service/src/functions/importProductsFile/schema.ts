export default {
	type: 'string',
	queryParameters: {
		name: { type: 'string' },
	},
	required: ['name'],
} as const;
