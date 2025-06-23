import { component$, useSignal, $ } from '@builder.io/qwik';
import * as v from 'valibot';
import { parse, ValiError } from 'valibot';

// Schema
export const SearchFormSchema = v.object({
    search: v.pipe(
        v.string(),
        v.minLength(3, 'Please! Enter at least 3 characters'),
        v.maxLength(250, 'Your prompt should not exceed 250 characters')
    ),
});

export const ImageSearch = component$(() => {
    const searchTerm = useSignal('');
    const images = useSignal<any[]>([]);
    const loading = useSignal(false);
    const validationError = useSignal<string | null>(null);
    const accessKey = import.meta.env.PUBLIC_UNSPLASH_ACCESS_KEY;

    const fetchImages = $(async () => {
        validationError.value = null;
        try {
            parse(SearchFormSchema, { search: searchTerm.value });
        } catch (error) {
            validationError.value =
                error instanceof ValiError
                    ? error.issues[0].message
                    : 'An unexpected validation error occurred.';
            console.error('Validation failed:', error);
            images.value = [];
            return;
        }

        loading.value = true;
        try {
            const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${searchTerm.value}&client_id=${accessKey}&per_page=20`
            );
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            images.value = data.results || [];
        } catch (error) {
            console.error('Fetch failed:', error);
            validationError.value = 'Failed to fetch images. Please try again.';
            images.value = [];
        } finally {
            loading.value = false;
        }
    });

    return (
        <div class="w-full lg:w-1/2 p-6 md:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
            <div class="flex flex-col items-center gap-4 text-center">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900">Qwik Unsplash API</h1>
                <p class="text-gray-600 max-w-2xl">
                    A demo image search app powered by the Unsplash API, built with{' '}
                    <a href="https://qwik.builder.io" target="_blank" class="hover:underline">Qwik</a> and
                    <a href="https://tailwindcss.com" target="_blank" class="hover:underline"> TailwindCSS</a>.
                </p>
                <div class="flex gap-4">
                    <a href="https://qwik.builder.io" target="_blank">
                        <img src="/logo/qwik-logo.png" alt="Qwik" class="h-10" />
                    </a>
                    <a href="https://tailwindcss.com" target="_blank">
                        <img src="/logo/tailwindcss-logo.png" alt="Tailwind CSS" class="h-8 mt-1" />
                    </a>
                    <a href="https://unsplash.com" target="_blank">
                        <img src="/logo/unsplash-logo.png" alt="Unsplash" class="h-9" />
                    </a>
                </div>
            </div>

            <div class="flex flex-col gap-3 max-w-4xl mx-auto">
                <div class="flex flex-wrap md:flex-nowrap items-center gap-3 justify-center">
                    <input
                        type="text"
                        placeholder="Search images from Unsplash"
                        class="w-full md:w-[75%] px-6 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 text-base"
                        bind:value={searchTerm}
                        onKeyDown$={(e) => e.key === 'Enter' && fetchImages()}
                    />
                    <button
                        class="bg-gray-800 text-white px-6 py-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-400 text-base transition-colors duration-200"
                        onClick$={fetchImages}
                        disabled={loading.value}
                    >
                        {loading.value ? 'Searching...' : 'Search'}
                    </button>
                </div>
                {validationError.value && (
                    <p class="text-red-500 text-sm mt-1 text-center">{validationError.value}</p>
                )}
            </div>

            {loading.value ? (
                <p class="text-center text-gray-600 text-lg animate-pulse">Loading amazing images...</p>
            ) : images.value.length === 0 && searchTerm.value.trim() !== '' && !validationError.value ? (
                <p class="text-center text-gray-500 text-lg">No images found for "{searchTerm.value}". Try a different keyword!</p>
            ) : images.value.length === 0 && searchTerm.value.trim() === '' ? (
                <div class="text-center mt-8 space-y-4 text-gray-600">
                    <h3 class="text-xl font-semibold">Start exploring!</h3>
                    <p class="text-base max-w-md mx-auto">
                        Enter any keyword above to discover stunning, high-resolution photography
                    </p>
                </div>
            ) : null}

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {images.value.map((img) => (
                    <div
                        key={img.id}
                        class="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-colors duration-200 flex flex-col h-auto"
                    >
                        <div class="w-full relative pt-[66.66%] bg-gray-100 flex items-center justify-center">
                            <img
                                src={img.urls.regular}
                                alt={img.alt_description || 'Unsplash Image'}
                                class="absolute top-0 left-0 w-full h-full object-contain p-2"
                                width={img.width}
                                height={img.height}
                                loading="lazy"
                            />
                        </div>
                        <div class="p-4 text-sm text-gray-800 font-medium border-t border-gray-100 mt-auto">
                            <span class="font-semibold text-gray-900">Photographer:</span> {img.user.name}
                            {img.description && <p class="text-xs text-gray-600 mt-1 truncate">{img.description}</p>}
                            {img.alt_description && img.alt_description !== img.description && (
                                <p class="text-xs text-gray-600 mt-1 italic truncate">Alt: {img.alt_description}</p>
                            )}
                        </div>
                        <div class="px-4 pb-3 flex justify-end">
                            <a
                                href={img.links.html}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-xs text-gray-600 hover:underline"
                            >
                                View on Unsplash
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
