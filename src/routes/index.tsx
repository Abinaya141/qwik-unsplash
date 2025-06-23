import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { QwikUnsplash } from "~/components/Unsplash";

export default component$(() => {
	return (
		<div>
			<QwikUnsplash />
		</div>
	);
});

export const head: DocumentHead = {
	title: 'Qwik Unsplash API',
};