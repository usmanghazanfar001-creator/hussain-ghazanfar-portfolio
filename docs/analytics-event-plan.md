# Analytics event plan (GA4)

Analytics is **off by default**. Set `VITE_GA_ID` (for example `G-XXXXXXXXXX`, your real ID) in Vercel to switch it on. With no ID, no analytics script is loaded and every `track()` call does nothing.

| Event | When it fires | Parameters |
|---|---|---|
| `page_view` | Every route change (sent manually, `send_page_view` is off) | `page_path`, `page_title` |
| `view_project` | A project page opens | `project`, `category` |
| `view_service` | A service page opens | `service` |
| `contact_form_submit` | Valid form submitted | `method` (`endpoint` or `mailto`) |
| `whatsapp_click` | WhatsApp button clicked | `location` |
| `email_click` | Email link clicked | `location` |
| `phone_click` | Phone link clicked | `location` |
| `cv_download` | CV button clicked (only exists when `cvUrl` is set) | none |

Mark `contact_form_submit`, `whatsapp_click`, `email_click` and `phone_click` as **key events** in GA4 (Admin → Events).

No cookie banner is included. If you serve visitors in regions that require consent for analytics, add a consent tool before enabling `VITE_GA_ID`.
