<script>
	import Footer from '$lib/components/layout/Footer.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Lyrik</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="grid h-full flex-auto place-content-center p-4">
		<slot />
	</main>
</div>
<Footer />
