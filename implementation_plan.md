Update Landing Page Video and ensure layout transparency for background videos.

1.  Rename video file in `public` folder (Done).
2.  Update `src/pages/LandingPage.tsx` to reference `vcas_landing_page_video.mp4`.
3.  Update `src/components/Layout.tsx` to remove `bg-background` (or make it `bg-transparent`) so the background video (`vcas.mp4`) can be seen on non-landing pages.
4.  Verify that `LandingPage` in split view properly displays its video (it does, as it has `bg-background` which acts as a base for its absolute children).
5.  Verify `App.tsx` structure to ensure no z-index conflicts.
