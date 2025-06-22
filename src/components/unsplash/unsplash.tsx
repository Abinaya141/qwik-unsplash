import { component$, useSignal, $ } from '@builder.io/qwik';
import { parse, ValiError } from 'valibot';
import { SearchFormSchema } from '~/routes/validation';

export const Unsplash = component$(() => {
    // State management for search term, images, loading status, and validation errors
    const searchTerm = useSignal('');
    const images = useSignal<any[]>([]);
    const loading = useSignal(false);
    const validationError = useSignal<string | null>(null);

    // Access the Unsplash API key from environment variables
    const accessKey = import.meta.env.PUBLIC_UNSPLASH_ACCESS_KEY;

    // Function to fetch images from Unsplash API
    const fetchImages = $(async () => {
        validationError.value = null; // Clear previous validation errors

        // Validate the search term using Valibot schema
        try {
            parse(SearchFormSchema, { search: searchTerm.value });
        } catch (error) {
            if (error instanceof ValiError) {
                validationError.value = error.issues[0].message;
            } else {
                validationError.value = 'An unexpected validation error occurred.';
                console.error('Validation failed unexpectedly:', error);
            }
            images.value = []; // Clear images if validation fails
            return;
        }

        loading.value = true; // Set loading state to true
        try {
            // Construct the API request URL
            const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${searchTerm.value}&client_id=${accessKey}&per_page=20`
            );
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            images.value = data.results || []; // Update images with fetched data
        } catch (error) {
            console.error('Failed to fetch images:', error);
            validationError.value = 'Failed to fetch images. Please try again.';
            images.value = []; // Clear images on fetch error
        } finally {
            loading.value = false; // Reset loading state
        }
    });

    return (
        <div class="min-h-screen flex flex-col lg:flex-row bg-white text-gray-900 font-sans">
            {/* LEFT SECTION: Unsplash App - Search and Results */}
            <div class="w-full lg:w-1/2 p-6 md:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
                {/* App Header */}
                <div class="text-center space-y-4">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900">Qwik Unsplash</h1>
                    {/* Unique description added here */}
                    <p class="text-medium text-gray-600 max-w-xl mx-auto">
                        A modern image search app powered by the Unsplash API, built with Qwik.
                    </p>
                </div>

                {/* Search Input and Button */}
                <div class="flex flex-col gap-3 max-w-xl mx-auto">
                    <div class="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search images..."
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-base"
                            bind:value={searchTerm}
                            onKeyDown$={(e) => {
                                if (e.key === 'Enter') fetchImages();
                            }}
                        />
                        <button
                            class="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-400 text-base transition-colors duration-200"
                            onClick$={fetchImages}
                            disabled={loading.value}
                        >
                            {loading.value ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    {/* Validation Error Display */}
                    {validationError.value && (
                        <p class="text-red-500 text-sm mt-1 text-center">{validationError.value}</p>
                    )}
                </div>

                {/* Feedback Messages */}
                {loading.value && (
                    <p class="text-center text-gray-600 text-lg animate-pulse">Loading amazing images...</p>
                )}
                {!loading.value && images.value.length === 0 && searchTerm.value.trim() !== '' && !validationError.value && (
                    <p class="text-center text-gray-500 text-lg">No images found for "{searchTerm.value}". Try a different keyword!</p>
                )}

                {/* Image Grid Display */}
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

            {/* RIGHT SECTION: Unsplash API Documentation - Black and White Professional Theme */}
            {/* Background color set to a very light gray (almost white) to maintain monochrome aesthetic */}
            <div class="w-full lg:w-1/2 p-6 md:p-8 overflow-y-auto space-y-8 bg-gray-50 border-t lg:border-t-0 border-gray-200">
                <h2 class="text-3xl md:text-4xl font-bold border-b pb-4 text-gray-800">Unsplash API Documentation</h2>

                {/* Introduction to Unsplash API */}
                <section class="space-y-3 text-base text-gray-700 leading-relaxed">
                    <p>
                        This application leverages the powerful{' '}
                        <a
                            href="https://unsplash.com/documentation"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                        >
                            Unsplash API
                        </a>{' '}
                        to fetch and display stunning, high-resolution images.
                    </p>
                    <p>
                        Unsplash offers a vast library of freely usable photos, making it an excellent resource for any project requiring high-quality visual content.
                    </p>
                </section>

                {/* Endpoint Overview */}
                <section>
                    <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Endpoint Overview</h3>
                    <ul class="list-disc pl-6 space-y-2 text-base text-gray-700">
                        <li><code>GET https://api.unsplash.com/search/photos</code></li>
                        <li>
                            Query Structure: <code class="bg-gray-100 p-1 rounded">?query=term&client_id=YOUR_ACCESS_KEY</code>
                        </li>
                    </ul>
                </section>

                {/* Key Parameters */}
                <section>
                    <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Key Parameters</h3>
                    <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                        <li><code>query</code>: The primary search keyword (e.g., `nature`, `cityscape`, `abstract`).</li>
                        <li><code>client_id</code>: Your unique Unsplash API access key, essential for authentication.</li>
                        <li><code>page</code>: Specifies the page number of results to retrieve (default: 1).</li>
                        <li><code>per_page</code>: Defines the number of results per page (default: 10, max: 30 for search).</li>
                    </ul>
                </section>

                {/* Authentication Details */}
                <section>
                    <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Authentication</h3>
                    <p class="text-base text-gray-700">
                        Access to the Unsplash API requires a valid <strong>client_id</strong>. This key is obtained by registering your application on the Unsplash developer dashboard. It must be included with every API request for successful authentication.
                    </p>
                </section>

                {/* Rate Limits Information */}
                <section>
                    <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Rate Limits</h3>
                    <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                        <li><strong>Standard Plan:</strong> Typically allows 50 requests per hour.</li>
                        <li><strong>Elevated Access:</strong> For higher volume needs, apps can be upgraded to 5000 requests/hour.</li>
                        <li>
                            Monitor your usage via response headers like <code class="bg-gray-100 p-1 rounded">X-Ratelimit-Limit</code> and <code class="bg-gray-100 p-1 rounded">X-Ratelimit-Remaining</code>.
                        </li>
                    </ul>
                </section>

                {/* Usage Guidelines */}
                <section>
                    <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Usage Guidelines</h3>
                    <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                        <li><strong>Attribution:</strong> Always credit the photographer when displaying Unsplash images.</li>
                        <li><strong>Caching:</strong> Avoid storing or caching large sets of Unsplash images locally.</li>
                        <li><strong>Links:</strong> Where possible, link back to the image's page on Unsplash and the photographer's profile.</li>
                    </ul>
                </section>

                {/* Sample Response */}
                <section>
                    <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Sample Response (Truncated)</h3>
                    <pre class="bg-gray-100 p-4 text-sm border border-gray-200 rounded-lg overflow-x-auto text-gray-800">
                        {`{
  "total": 1234,
  "total_pages": 124,
  "results": [
    {
      "id": "abc_123",
      "slug": "sample-photo-xyz",
      "created_at": "2023-01-01T10:00:00Z",
      "alt_description": "A stunning landscape with mountains and a lake.",
      "urls": {
        "regular": "https://images.unsplash.com/photo-..."
      },
      "user": {
        "name": "Jane Doe"
      }
    },
    {
      "id": "def_456",
      "slug": "cute-cat-portrait",
      "created_at": "2023-03-15T14:30:00Z",
      "alt_description": "A fluffy ginger cat looking directly at the camera.",
      "urls": {
        "regular": "https://images.unsplash.com/photo-cat-example-..."
      },
      "user": {
        "name": "John Smith"
      },
      "description": "A close-up portrait of a domestic cat."
    }
  ]
}`}
                    </pre>
                </section>

                {/* Further Resources */}
                <section>
                    <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Further Resources</h3>
                    <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                        <li>
                            <a
                                href="https://unsplash.com/documentation"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="underline text-gray-700 hover:text-gray-900 transition-colors duration-200"
                            >
                                Unsplash API Official Documentation
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://unsplash.com/oauth/applications"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="underline text-gray-700 hover:text-gray-900 transition-colors duration-200"
                            >
                                Register Your Unsplash Application & Get Access Key
                            </a>
                        </li>
                    </ul>
                </section>

                {/* Footer for Documentation Panel */}
                <footer class="text-sm text-gray-500 border-t pt-5 mt-8 text-center">
                    <p>Built with <strong>Qwik</strong> and <strong>Tailwind CSS</strong>.</p>
                    <p>This application serves as a demonstration of clean integration with public APIs for a performant web experience.</p>
                </footer>
            </div>
        </div>
    );
});