<script lang="ts">
	export let type: string = 'button';
</script>

<button
	on:click
	{type}
	class=" bg-primary rounded px-4 py-1 font-medium text-black transition-all hover:brightness-90"
>
	<slot />
</button>
