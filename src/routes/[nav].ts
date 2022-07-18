import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });

const databaseId = import.meta.env.VITE_NOTION_DATABASE_NAV_ID;

export async function GET() {
	try {
		const { results: dbResults } = await notion.databases.query({ database_id: databaseId });
		const items = await Promise.all(
			dbResults.map(
				async ({
					id: page_id,
					properties: {
						Name: { id: name_id }
					}
				}) => {
					const responses = await Promise.all([
						notion.pages.properties.retrieve({
							page_id,
							property_id: name_id
						})
					]);

					return {
						name: responses[0].results[0].title.plain_text
					};
				}
			)
		);
		return { body: { items } };
	} catch (error) {
		console.error('Failed!');
		return { status: 500 };
	}
}
