<script>
	export let navItems;
</script>

<nav>
	<ul>
		{#each navItems as item}
			<li><a href={item.path}>{item.name}</a></li>
		{/each}
	</ul>
</nav>
