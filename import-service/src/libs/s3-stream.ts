import csvParser from 'csv-parser';

export const processS3Stream = async (stream) => {
	return new Promise((resolve, reject) => {
		const chunks = [];
		stream
			.pipe(csvParser())
			.on('data', (data) => chunks.push(data))
			.on('error', reject)
			.on('end', () => resolve(chunks));
	});
};