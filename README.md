# DiM-WAM Project Page

Static GitHub Pages project page for DiM-WAM.

Files:

- `index.html`: project page entry point.
- `styles.css`: responsive page styling.
- `script.js`: generates the reserved 4 x 4 real-robot demo matrix.
- `paper.pdf`: paper PDF shown by the project page.
- `assets/figures/`: page figures copied from the LaTeX project.
- `videos/`: optional local MP4 demo files.

To publish:

1. Push this folder to a GitHub repository.
2. In repository settings, open Pages.
3. Set source to the main branch and root directory.
4. The page will be served at `https://<username>.github.io/<repo>/`.

To add or update videos, fill entries in `realWorldVideoFiles` in `script.js`.
YouTube URLs are embedded with `youtube-nocookie.com` iframes and also include
an external YouTube link below each player; local or remote MP4 URLs are
rendered with native video controls.

```js
"find-blue-block/dim-wam": {
  url: "https://youtu.be/zJm0yGS_vyU",
  status: "success",
},
```
