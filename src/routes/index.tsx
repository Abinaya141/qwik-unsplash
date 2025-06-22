import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// components
import { Unsplash } from "~/components/unsplash";

export default component$(() => {
	return (
		<div>
			<Unsplash />
		</div>
	);
});

export const head: DocumentHead = {
	title: 'Qwik Unsplash App',
};