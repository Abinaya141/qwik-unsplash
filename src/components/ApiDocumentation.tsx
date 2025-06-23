import { component$ } from '@builder.io/qwik';

export const ApiDocumentation = component$(() => {
    return (
        <div class="w-full lg:w-1/2 p-6 md:p-8 overflow-y-auto space-y-8 bg-gray-50 border-t lg:border-t-0 border-gray-200">
            <h2 class="text-3xl md:text-4xl font-bold border-b pb-4 text-gray-800">Qwik Unsplash API</h2>

            {/* Introduction Section */}
            <section class="space-y-3 text-base text-gray-700 leading-relaxed">
                <p>
                    This application is built using a modern tech stack combining{' '}
                    <a
                        href="https://qwik.builder.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        Qwik
                    </a>{' '}
                    for ultra-fast frontend performance,{' '}
                    <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        Tailwind CSS
                    </a>{' '}
                    for clean and responsive UI styling, and{' '}
                    <a
                        href="https://valibot.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        Valibot
                    </a>{' '}
                    for schema-based input validation. It integrates the{' '}
                    <a
                        href="https://unsplash.com/documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        Unsplash API
                    </a>{' '}
                    to fetch and display high-quality, royalty-free images based on user search input.
                </p>
            </section>

            {/* Endpoint Overview */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Endpoint Overview</h3>
                <div class="bg-white border border-gray-200 rounded-lg p-4 text-base text-gray-700">
                    <p><code>GET https://api.unsplash.com/search/photos</code></p>
                    <p class="mt-2">
                        Query Parameters:{' '}
                        <code class="bg-gray-100 p-1 rounded">?query=&lt;sample&gt;&client_id=YOUR_ACCESS_KEY</code>
                    </p>
                </div>
            </section>

            {/* Key Parameters */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Key Parameters</h3>
                <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                    <li><code>query</code>: The keyword to search for (e.g., <code>nature</code>, <code>cityscape</code>).</li>
                    <li><code>client_id</code>: Your personal Unsplash API access key.</li>
                </ul>
            </section>

            {/* Rate Limits */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Rate Limits</h3>
                <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                    <li><strong>Standard Plan (as of June 2025):</strong> Up to 50 requests per hour.</li>
                </ul>
            </section>

            {/* Sample Request */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Sample API Request</h3>
                <pre class="bg-gray-100 p-4 mb-4 text-sm border border-gray-200 rounded-lg overflow-x-auto text-gray-800">
                    {`GET https://api.unsplash.com/search/photos?query=mountains&client_id=YOUR_ACCESS_KEY`}
                </pre>
            </section>

            {/* Sample Response */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Sample API Response</h3>
                <pre class="bg-gray-100 p-4 text-sm border border-gray-200 rounded-lg overflow-x-auto text-gray-800">
                    {`{
  "total": 10000,
  "results": [
    {
      "id": "abc123",
      "alt_description": "A mountain range at sunset",
      "urls": {
        "regular": "https://images.unsplash.com/photo-..."
      },
      "user": {
        "name": "Photographer Name"
      }
    }
  ]
}`}
                </pre>
            </section>

            {/* Footer */}
            <footer class="text-sm text-gray-500 border-t pt-5 mt-8 text-center space-y-2">
                <p>
                    Built with{' '}
                    <a href="https://qwik.builder.io" target="_blank" class="underline font-semibold">Qwik</a>,{' '}
                    <a href="https://tailwindcss.com" target="_blank" class="underline font-semibold">Tailwind CSS</a>, and{' '}
                    <a href="https://valibot.dev" target="_blank" class="underline font-semibold">Valibot</a>. Powered by the{' '}
                    <a href="https://unsplash.com/documentation" target="_blank" class="underline font-semibold">Unsplash API</a>.
                </p>
                <p>
                    Developed by{' '}
                    <a href="https://github.com/abinaya-code" target="_blank" class="underline font-semibold">
                        Abinaya ↗
                    </a>
                </p>
            </footer>
        </div>
    );
});
