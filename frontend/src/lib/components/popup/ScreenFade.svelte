<script lang="ts">
	import Portal from './Portal.svelte';
	import { fade } from 'svelte/transition';

	export let showing: boolean;
</script>

<Portal>
	{#if showing}
		<div
			class="pointer-events-auto z-20 grid h-screen w-screen place-content-center bg-[#000]/40 p-4"
			transition:fade={{ duration: 250 }}
			on:click|self={() => (showing = false)}
		>
			<slot />
		</div>
	{/if}
</Portal>

<style lang="postcss">
</style>
