<script lang="ts">
	import { currentSong } from '$lib/stores/songStore';
	import { fly, fade } from 'svelte/transition';
	import Portal from './popup/Portal.svelte';

	export let isCorrect: boolean;
	export let revealed: boolean;
</script>

<Portal>
	{#if revealed}
		<div
			transition:fly={{ duration: 750 }}
			class="z-40 m-auto flex h-screen flex-col items-center justify-center bg-[#000]/40"
			on:click={() => {
				revealed = false;
			}}
		>
			<div class="flex w-full max-w-md flex-col gap-y-4 rounded bg-black p-8 text-2xl shadow">
				<h1 class="text-center text-xl">
					{isCorrect ? 'Correct!' : 'Incorrect.'}
				</h1>
				<h2 class="text-center">
					{$currentSong.name}
				</h2>
				<span class="opacity-50">
					{$currentSong.artist}
					<br />
					{$currentSong.album}
				</span>
			</div>
		</div>
	{/if}
</Portal>
