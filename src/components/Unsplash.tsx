import { component$ } from '@builder.io/qwik';

// import Components 
import { ImageSearch } from './ImageSearch';
import { ApiDocumentation } from './ApiDocumentation';

export const QwikUnsplash = component$(() => {
    return (
        <div class="min-h-screen flex flex-col lg:flex-row bg-white text-gray-900 font-sans">
            <ImageSearch />
            <ApiDocumentation />
        </div>
    );
});
