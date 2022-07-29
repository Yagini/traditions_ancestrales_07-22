import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });
const databaseId = import.meta.env.VITE_NOTION_DATABASE_NAV;

export async function GET() {
	const response = await notion.databases.query({ database_id: databaseId });

	console.log(response);
}

// const navItem = [
// 	{
// 		name: 'A propos',
// 		path: '/about',
// 		id: '1'
// 	},
// 	{
// 		name: 'La fondatrice',
// 		path: '/lafondatrice',
// 		id: '2'
// 	}
// ];
