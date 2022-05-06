<script lang="ts">
	import { currentSong } from '$lib/stores/songStore';
	import { Icon } from 'svelte-awesome';
	import random from 'svelte-awesome/icons/random';
	import enter from 'svelte-awesome/icons/arrow-right';
	import { onMount } from 'svelte';
	import PrimaryButton from './buttons/PrimaryButton.svelte';
	import SecondaryButton from './buttons/SecondaryButton.svelte';

	export let onReveal: (isCorrect: boolean) => void;
	export let onRandomize: () => void;
	$: spaceIndices = getSpaceIndices();
	let guess: string = '';
	let input: HTMLInputElement;

	onMount(() => {
		input.focus();
	});

	const onSubmit = () => {
		onReveal(isCorrect());
	};

	const isCorrect = () => noSpaces($currentSong.name).toLowerCase() === guess;

	const noSpaces = (str: string) => str.replace(/\s/g, '');

	const getSpaceIndices = () => {
		const indices = [];
		for (let i = 0; i < $currentSong.name.length; i++)
			if ($currentSong.name[i] === ' ') indices.push(i - indices.length - 1);
		return indices;
	};
</script>

<form class="flex w-full flex-col items-center gap-8" on:submit|preventDefault={onSubmit}>
	<label for="title-guess" class="flex justify-center gap-2 font-mono text-3xl">
		{#each noSpaces($currentSong.name) as _, charIx}
			<div
				class="border-b-4 border-white/20 p-2 text-transparent"
				class:current-char={guess.length === charIx}
				class:char-filled={guess.length > charIx}
			>
				{guess.length > charIx ? guess[charIx] : '+'}
			</div>

			{#if spaceIndices.includes(charIx)}
				<div class="p-2">&nbsp;</div>
			{/if}
		{/each}
		<input
			bind:this={input}
			bind:value={guess}
			on:input={(e) => {
				guess = noSpaces(guess).toLowerCase();
			}}
			id="title-guess"
			type="text"
			class="sr-only"
			autocomplete="off"
			maxlength={noSpaces($currentSong.name).length}
		/>
	</label>
	<div class="flex gap-4">
		<SecondaryButton on:click={onRandomize}>
			<Icon data={random} class="h-9 w-9 p-2" />
		</SecondaryButton>
		<PrimaryButton type="submit">
			<Icon data={enter} class="h-9 w-9 p-2" />
		</PrimaryButton>
	</div>
</form>

<style lang="postcss">
	.current-char {
		@apply border-primary;
	}

	.char-filled {
		@apply text-inherit;
	}
</style>
