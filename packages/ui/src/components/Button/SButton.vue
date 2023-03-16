<template>
	<button
		class="tw-container tw-invisible tw-static tw-pt-4 tw-pb-4 tw-text-3xl"
		@click="handleClick()"
	>
		Click Me
	</button>
</template>

<script setup lang="ts">
function handleClick() {
	console.log("Clicked");
}
</script>
