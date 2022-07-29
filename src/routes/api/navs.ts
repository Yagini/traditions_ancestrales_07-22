import type { RequestHandler } from '@sveltejs/kit';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });

export const GET: RequestHandler = async () => {
	const response = await notion.search({
		query: 'traditionsancestrales.fr'
	});
	const pageId = response.results[0].id;
	const blocksResponse = await notion.blocks.children.list({ block_id: pageId });
	const navBlock = blocksResponse.results.find(
		(nav: any) => nav.child_database.title === 'Navigation'
	);
	if (!navBlock)
		return {
			status: 404,
			error: 'navigation Id not found'
		};
	const navBlockId = navBlock.id;
	const { results: navDb } = await notion.databases.query({ database_id: navBlockId });
	// database map properties
	const navs = navDb.map((nav: any) => ({
		...nav,
		properties: Object.fromEntries(
			Object.entries(nav.properties).map(([key, value]: [key: string, value: any]) => [
				key,
				notion.pages.properties.retrieve({ property_id: value.id })
			])
		)
	}));

	return {
		status: 200,
		body: { navs }
	};
};
