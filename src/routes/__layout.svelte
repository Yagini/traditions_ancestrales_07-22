<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';

	export let navItems;
</script>

<main class="container mx-auto px-4">
	<h1>L'ENVOL</h1>
	<div>
		<Nav {navItems} />
	</div>
	<slot />
</main>
