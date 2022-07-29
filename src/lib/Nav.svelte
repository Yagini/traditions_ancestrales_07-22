<script lang="ts">
	const navItems = [
		{
			name: 'A propos',
			path: '/about',
			id: '1'
		},
		{
			name: 'La fondatrice',
			path: '/lafondatrice',
			id: '2'
		}
	];

	// export let navItem: object;
</script>

<nav class="navbar bg-base-100">
	<ul>
		{#each navItems as { name, path }}
			<li><a class="btn btn-ghost normal-case text-xl" href={path}>{name}</a></li>
		{/each}
	</ul>
</nav>
