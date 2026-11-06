# First client acquisition test

No campaign has been launched and no advertising money has been spent by this change.

## One offer and one starting audience

Offer: scoped web MVP development for early-stage founders. Start with founders in Nigeria rather than spreading a small budget across the world. The site still welcomes international work. Treat this as a first hypothesis, not a proven audience.

Primary route: click-to-WhatsApp ads opening a business conversation. Use the website as proof. Alternate route: send website ads to https://www.buildwithayomide.com/build-your-mvp/ . Match the ad message to the MVP offer. Connect the intended WhatsApp Business number to the correct Meta business/Page and verify available campaign objectives and messaging performance goals in the account. Prefer a goal tied to conversations or leads over link clicks when available; exact availability varies. No access to the Meta account was supplied here.

## Two creative concepts

Keep the offer, audience, placement settings, and destination consistent when comparing creatives.

1. Product walkthrough: a 20–30 second screen recording of a project you are authorized to show. Explain the user's problem, demonstrate one core journey, and finish with an invitation to discuss an MVP. Do not expose patient, candidate, payment, or private customer information.
2. Founder video: "Have a product idea but need help turning it into a working app? I’m Ayomide, a software engineer based in Lagos. I work with founders to define the first version, build the core journeys, and prepare for launch. Tell me what you want to build on WhatsApp."

Example copy: "You have the idea. Let’s work out the first version. Build a focused web MVP with an experienced engineer—from scope and core workflows to deployment. Message Ayomide with your idea, budget range, and timeline."

CTA: Send WhatsApp message. Do not promise fixed delivery times, revenue, or a price you have not agreed to offer. Do not claim other project users or customers are customers of this service. Add genuine testimonials only with permission.

## Set a budget before launching

Choose a total test amount you can comfortably lose, a daily cap, and an end date. A 7-day comparison is a reasonable planning starting point, not a guarantee of results. Small budgets can be inconclusive. Do not increase spend solely because clicks are cheap. Review lead quality and cash received. If you change the offer, audience, and creative together, you will not know what caused the change.

## Landing-page campaign tags

Creative A: https://www.buildwithayomide.com/build-your-mvp/?utm_source=meta&utm_medium=paid_social&utm_campaign=mvp_nigeria_test&utm_content=product_walkthrough

Creative B: https://www.buildwithayomide.com/build-your-mvp/?utm_source=meta&utm_medium=paid_social&utm_campaign=mvp_nigeria_test&utm_content=founder_video

The site carries these tags into prepared inquiry messages. A user must actually send the message to deliver it. Do not put names, contact details, or other personal data in campaign tags.

## Qualify and follow up

Reply when available and set honest response expectations in the WhatsApp Business greeting/away message. Ask:

- Who is the product for, and what problem does it solve?
- What is the smallest useful first version?
- Is there a budget range and intended timeline?

Then agree the next conversation or send a scope/proposal. Keep the initial exchange short; the detailed email brief is optional on the homepage. Do not require customers to choose a technology stack before speaking.

## Measure outcomes

Use lead-log.csv as a template; keep actual customer records outside this Git repository. Record source/creative, actual inquiry, qualified conversation, proposal, won/lost, ad spend, and money received. A qualified conversation has a clear need and a plausible budget/timeline, not merely a click.

Cost per qualified conversation = spend / qualified conversations.
Acquisition cost = spend / new paying clients.
If the denominator is zero, report no qualified conversations/clients rather than an invented rate.

Compare acquisition cost to the project's expected gross profit after delivery costs. Stop or revise if lead quality is poor, response capacity is exhausted, or the preset budget is reached. No target cost or conversion rate is asserted.

## Optional Meta measurement

The site has no configured Pixel ID. Set your own ID in dist/marketing-config.js when ready. The integration requests permission before loading and respects Do Not Track. ContactIntent is a custom intent event, not a Lead or purchase. It excludes form text/contact details from custom event parameters. No Conversions API or CRM integration is configured.

Before optimizing website campaigns around confirmed leads, implement a verified delivery/qualification pipeline and an appropriate privacy review. A mailto draft or WhatsApp click is not a server-confirmed lead. Check Meta Events Manager and consent behavior before paying for a website-conversion campaign. Do not add fake conversion events.

References: https://whatsappbusiness.com/products/ads-that-click-to-whatsapp/ and https://whatsappbusiness.com/resources/resource-library/ads-that-click-to-whatsapp-smb-guide/
