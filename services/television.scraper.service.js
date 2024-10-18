const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const urls = Array.from({ length: 18 }, (_, i) => `https://sstv.ge/show/${i + 1}`);

async function fetchShows() {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const htmls = await Promise.all(responses.map(response => response.text()));
        
        const results = htmls.map(html => {
            const dom = new JSDOM(html);
            const titleElement = dom.window.document.querySelector('.col-lg-12.show-title');
            const descriptionElement = dom.window.document.querySelector('.col-lg-12.show-descr p');
            const videoLinkElements = dom.window.document.querySelectorAll('.popup-youtube');

            const videoLinks = Array.from(videoLinkElements).map(link => link.href);

            return {
                title: titleElement ? titleElement.textContent.trim() : null,
                description: descriptionElement ? descriptionElement.textContent.trim() : null,
                videoLinks: videoLinks.length > 0 ? videoLinks : [], 
            };
        });
        return results.filter(item => item.title || item.description || item.videoLinks.length > 0); 
    } catch (error) {
        console.error('Error fetching titles, descriptions, and video links:', error);
        throw new Error('Failed to fetch shows'); 
    }
}

module.exports = { fetchShows }; 
