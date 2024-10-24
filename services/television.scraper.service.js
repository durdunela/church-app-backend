import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const urls = Array.from({ length: 18 }, (_, i) => `https://sstv.ge/show/${i + 1}`);
const imagePageUrl = 'https://sstv.ge/shows';

async function fetchImageUrls() {
    try {
        const response = await fetch(imagePageUrl);
        const html = await response.text();
        const dom = new JSDOM(html);
        
        const showElements = dom.window.document.querySelectorAll('.single-business-news');
        return Array.from(showElements).map(show => {
            const imageElement = show.querySelector('.business-news-image img');
            const showLinkElement = show.querySelector('a');
            const showId = showLinkElement ? showLinkElement.href.match(/\/show\/(\d+)/)?.[1] : null;
            const imageUrl = imageElement ? imageElement.src : null;
            
            return {
                showId,
                imageUrl
            };
        });
    } catch (error) {
        console.error('Error fetching image URLs:', error);
        throw new Error('Failed to fetch image URLs');
    }
}

async function fetchShows() {
    try {
        const imageUrls = await fetchImageUrls();
        
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const htmls = await Promise.all(responses.map(response => response.text()));

        const results = htmls.map((html, index) => {
            const dom = new JSDOM(html);
            const titleElement = dom.window.document.querySelector('.col-lg-12.show-title');
            const descriptionElement = dom.window.document.querySelector('.col-lg-12.show-descr p');
            const videoLinkElements = dom.window.document.querySelectorAll('.popup-youtube');
            
            const postTitleElement = dom.window.document.querySelector('.single-vpost-content .single-vpost-title');
            const postTitle = postTitleElement ? postTitleElement.textContent.trim() : null;
        
            const videoLinks = Array.from(videoLinkElements).map(link => link.href);
            const imageUrlObj = imageUrls.find(img => img.showId === (index + 1).toString());
            const imageUrl = imageUrlObj ? imageUrlObj.imageUrl : null;
        
            return {
                title: titleElement ? titleElement.textContent.trim() : (postTitle || null),
                description: descriptionElement ? descriptionElement.textContent.trim() : null,
                videoLinks: videoLinks.length > 0 ? videoLinks : [],
                imageUrl: imageUrl
            };
        });
        

        return results.filter(item => item.title || item.description || item.videoLinks.length > 0 || item.imageUrl);
    } catch (error) {
        console.error('Error fetching shows:', error);
        throw new Error('Failed to fetch shows');
    }
}

export  { fetchShows };
