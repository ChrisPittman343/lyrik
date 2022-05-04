<script lang="ts">
	import { currentSong } from '$lib/stores/songStore';

	import { onMount } from 'svelte';

	export let onReveal: (isCorrect: boolean) => void;
	$: spaceIndices = getSpaceIndices();
	let guessName: string = '';
	let input: HTMLInputElement;

	onMount(() => {
		input.focus();
	});

	const onSubmit = () => {
		onReveal(isCorrect());
	};

	const isCorrect = () => noSpaces($currentSong.name).toLowerCase() === guessName;

	const noSpaces = (str: string) => str.replace(/\s/g, '');

	const getSpaceIndices = () => {
		const indices = [];
		for (let i = 0; i < $currentSong.name.length; i++)
			if ($currentSong.name[i] === ' ') indices.push(i - indices.length - 1);
		return indices;
	};
</script>

<form class="flex w-full justify-center gap-x-4" on:submit|preventDefault={onSubmit}>
	<label for="title-guess" class="flex gap-2 font-mono text-3xl">
		{#each noSpaces($currentSong.name) as _, charIx}
			<div
				class="border-b-4 border-white/20 p-2 text-transparent"
				class:current-char={guessName.length === charIx}
				class:char-filled={guessName.length > charIx}
			>
				{guessName.length > charIx ? guessName[charIx] : '+'}
			</div>

			{#if spaceIndices.includes(charIx)}
				<div class="p-2">&nbsp;</div>
			{/if}
		{/each}
		<input
			bind:this={input}
			bind:value={guessName}
			on:input={(e) => {
				guessName = noSpaces(guessName).toLowerCase();
				if (guessName.length === noSpaces($currentSong.name).length) onSubmit();
			}}
			id="title-guess"
			type="text"
			class="sr-only"
			autocomplete="off"
			maxlength={$currentSong.name.length}
		/>
	</label>
</form>

<style lang="postcss">
	.current-char {
		@apply border-primary;
	}

	.char-filled {
		@apply text-inherit;
	}
</style>
