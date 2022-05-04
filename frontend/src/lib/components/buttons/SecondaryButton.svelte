<script lang="ts">
	export let type: string = 'button';
</script>

<button
	on:click
	{type}
	class="flex items-center gap-2 rounded bg-white/10 px-4 py-1 font-medium opacity-70 transition-opacity hover:opacity-100"
>
	<slot />
</button>
