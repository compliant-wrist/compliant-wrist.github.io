# Compliant wrist project page

This is a buildless, local project page. Open `index.html`, or serve the `personal_website` folder with a static HTTP server for browser playback.

## Content sources

- Original manuscript: `wrist_arxiv.zip / CompliantWrist.tex` and its eight figures.
- Original supplementary video: `wrist_video.mp4`, 1280 × 720, 48.97 seconds, no audio track.
- Updated hero and personal-homepage preview source: `Supplementary Video Original 3.mp4.zip / Supplementary Video Original 3.mp4`, 1920 × 1080, 29.97 fps, 48.98 seconds, approximately 25 Mbps, no audio track.
- Publication status: [arXiv:2610.07319](https://arxiv.org/abs/2610.07319), v1 released October 5, 2026, in Robotics (cs.RO). The conference submission remains ICRA 2027, under review.
- `assets/compliant-wrist-paper.pdf` is a byte-for-byte copy of the supplied `../../arxiv_wrist.pdf` (8 pages), updated on October 6, 2026. The first page identifies arXiv:2610.07319v1, and its title and seven authors match the public arXiv record. The PDF contents are unchanged.
- `assets/citation.bib` contains the complete citation from [arXiv's BibTeX export](https://arxiv.org/bibtex/2610.07319). The Paper section offers the same BibTeX in a collapsible panel, with copy and download controls. If clipboard access fails, the page asks readers to select and copy the citation manually or download the file.

## Video excerpts

All clips preserve source playback timing and embedded labels, with H.264 encoding and fast-start metadata. The updated `wrist-compliance.mp4` retains the new source’s native 1920 × 1080 resolution and 29.97 fps, encoded with x264 CRF 17 and the slow preset. The same high-quality clip is copied into the personal homepage so each site remains self-contained; both poster images are fresh 1920 × 1080 stills from the clip’s opening frame. Other experiment excerpts retain their original source.

| Clip | Source start | Duration | Purpose |
| --- | ---: | ---: | --- |
| wrist-compliance.mp4 | 11.5 s | 7.0 s | Manual compliance / mechanism close-up |
| low-stiffness.mp4 | 23.0 s | 10.5 s | Composite versus low rotational stiffness |
| high-stiffness.mp4 | 34.7 s | 7.2 s | Composite versus high rotational stiffness |
| high-speed.mp4 | 43.0 s | 5.0 s | High-speed interaction and angular deflection |
| stiffness-test.mp4 | 3.5 s | 4.3 s | Stiffness characterization |

`wrist-full-video.mp4` is an unchanged copy of the supplied video. The website clearly identifies the project as under review; the video's original ICRA 2027 title card is preserved.

## Assets and behavior

- The opening video covers the entire first viewport, with the title layered over a dark gradient. The responsive background crops to fill the screen; a full-frame clip link retains access to the uncropped mechanism and gripper inset. Authors and paper links follow below the first screen. Pause controls and reduced-motion preferences are preserved.
- The three module cards flip independently. A click shrinks the shape into the upper-left corner and shows only that module's six-axis profile. All three can stay open for comparison; click again to return to the shape. Enter/Space also flip cards, arrows move focus, and Escape returns the focused card to its shape. Reduced-motion mode switches instantly.
- `module-type-i.webp`, `module-type-ii.webp`, and `module-type-iii.webp` are crops of original Figure 2A. `module-stiffness-comparison.webp` preserves Figure 2B's original comparison and legend.
- `module-stiffness-i.svg`, `module-stiffness-ii.svg`, and `module-stiffness-iii.svg` isolate the respective blue, green, and red profiles. Their polygon centerlines were traced from the original raster using color separation and line fitting, with the common frame and original relative scale retained. They are illustrative digitizations, not raw stiffness data. Typical vertex uncertainty is 2–3 original-image pixels, up to about 6 pixels at the acute blue right tip. No numerical stiffness values or tick labels were inferred. Each SVG embeds its provenance and traced pixel coordinates, and the page labels the redrawn profiles with a link to the original figure.
- The middle and right radar panels in Figure 2B concern Type I width/thickness variation; they are not used as Type II/III profiles.
- The personal homepage uses its own `assets/research/wrist-thumb.webp`, a full-frame 1920 × 1080 still from the high-quality source at 11.5 seconds. The older project-local `thumb.webp` is unused.
- Other WebP figures are resized versions of the supplied JPG figures.
- Short clips play when visible, pause off screen, and expose individual pause controls. Reduced-motion preferences disable automatic playback.
- Comparison tabs support arrow keys, Home, and End. Figures open in a native dialog that closes with Escape.
- The hero and Paper section link to the public arXiv record and the local PDF. Academic citation metadata includes all authors, the release date, arXiv identifier, and PDF URL.
- Project navigation stays within the Wrist project. The author homepage link is configured independently in the release builder.

Project website: https://compliant-wrist.github.io/
GitHub repository: https://github.com/compliant-wrist/compliant-wrist.github.io
The independent deployment checkout is `../../.deploy/compliant-wrist`.
Personal homepage: https://samxie34.github.io/
The editing copy keeps its local author link; the release builder maps it to the published homepage.
