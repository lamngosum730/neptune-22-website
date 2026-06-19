# Neptune 22 Website

Static website for Neptune 22 Equipment & Technical Services Ltd.

## Files

- `index.html` - website content and structure
- `styles.css` - responsive design
- `script.js` - mobile menu, enquiry helper and email preparation
- `assets/` - product photos and website images
- `CNAME` - custom domain setting for GitHub Pages (`neptune-22.com`)

## GitHub Pages Deployment

1. Create a public GitHub repository, for example `neptune-22-website`.
2. Upload all files in this folder to the repository root.
3. In GitHub, go to Settings > Pages.
4. Set Source to `Deploy from a branch`, branch `main`, folder `/root`.
5. Set Custom domain to `neptune-22.com`.
6. In GoDaddy DNS, point the domain to GitHub Pages.

## AI Function

The current version includes a browser-side enquiry helper. It prepares a project brief and opens the user's email client.

For a real chatbot that answers from product documents, add a backend endpoint on a server. Do not put API keys inside `script.js` because browser files are public.
